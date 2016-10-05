import fs from 'fs';
import path from 'path';
import test from 'ava';
import tempfile from 'tempfile';
import fn from './';

const numbertest = 10;

test.beforeEach(async t => {
	const tmpDir = tempfile();
	fs.mkdirSync(tmpDir);
	t.context.tmpDir = tmpDir;
	t.context.tmpFiles = [];

	for (var i = numbertest; i >= 0; i--) {
		let filepath = path.resolve(tmpDir, `${i}.txt`);
		t.context.tmpFiles.push(filepath);
		fs.writeFileSync(filepath, i);
	}
});

test.afterEach(t => {
	t.context.tmpFiles.forEach(file => {
		fs.unlinkSync(file);
	});
	fs.rmdirSync(t.context.tmpDir);
});

test('async (rename with blank string)', async t => {
	const result = await fn();
	t.is(result, true);
});

test('sync (rename with blank string)', t => {
	const result = fn.sync();
	t.is(result, true);
});

test('async (rename with the same)', async t => {
	let filesBefore = fs.readdirSync(t.context.tmpDir).sort();
	await fn('(\\w+).txt', '$1.txt', {path: t.context.tmpDir});
	let filesAfter = fs.readdirSync(t.context.tmpDir).sort();
	t.deepEqual(filesBefore, filesAfter);
});

test('sync (rename with the same)', t => {
	let filesBefore = fs.readdirSync(t.context.tmpDir).sort();
	fn.sync('(\\w+).txt', '$1.txt', {path: t.context.tmpDir});
	let filesAfter = fs.readdirSync(t.context.tmpDir).sort();
	t.deepEqual(filesBefore, filesAfter);
});

test('async (rename with the diffrent)', async t => {
	let filesBefore = fs.readdirSync(t.context.tmpDir);
	filesBefore = filesBefore.map(file => file.replace(/(\w+).txt/, '$1_001.txt'));
	filesBefore.sort();
	await fn('(\\w+).txt', '$1_001.txt', {path: t.context.tmpDir});
	let filesAfter = fs.readdirSync(t.context.tmpDir);
	filesAfter.sort();
	t.context.tmpFiles = filesAfter.map(file => path.resolve(t.context.tmpDir, file));
	t.deepEqual(filesBefore, filesAfter);
});

test('sync (rename with the diffrent)', t => {
	let filesBefore = fs.readdirSync(t.context.tmpDir);
	filesBefore = filesBefore.map(file => file.replace(/(\w+).txt/, '$1_001.txt'));
	filesBefore.sort();
	fn.sync('(\\w+).txt', '$1_001.txt', {path: t.context.tmpDir});
	let filesAfter = fs.readdirSync(t.context.tmpDir);
	filesAfter.sort();
	t.context.tmpFiles = filesAfter.map(file => path.resolve(t.context.tmpDir, file));
	t.deepEqual(filesBefore, filesAfter);
});

test('async (not exist test result)', async t => {
	const result = await fn('always ok', 'always ok', {path: '/the/not/exited/path'});
	t.is(result, false);
});

test('sync (not exist test result)', t => {
	const result = fn.sync('always ok', 'always ok', {path: '/the/not/exited/path'});
	t.is(result, false);
});


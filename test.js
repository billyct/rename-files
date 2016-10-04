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

test('async (only directory test result)', async t => {
	const result = await fn(t.context.tmpDir);
	t.is(result, true);
});

test('sync (only directory test result)', t => {
	const result = fn.sync(t.context.tmpDir);
	t.is(result, true);
});

test('async (only directory test files)', async t => {
	let filesBefore = fs.readdirSync(t.context.tmpDir).sort();
	await fn(t.context.tmpDir);
	let filesAfter = fs.readdirSync(t.context.tmpDir).sort();
	t.deepEqual(filesBefore, filesAfter);
});

test('sync (only directory test files)', t => {
	let filesBefore = fs.readdirSync(t.context.tmpDir).sort();
	fn.sync(t.context.tmpDir);
	let filesAfter = fs.readdirSync(t.context.tmpDir).sort();
	t.deepEqual(filesBefore, filesAfter);
});

test('async (only directory test files with rule)', async t => {
	let filesBefore = fs.readdirSync(t.context.tmpDir);
	filesBefore = filesBefore.map(file => file.replace(/(\w+).txt/, '$1_001.txt'));
	filesBefore.sort();
	await fn(t.context.tmpDir, '$_001');
	let filesAfter = fs.readdirSync(t.context.tmpDir);
	filesAfter.sort();
	t.context.tmpFiles = filesAfter.map(file => path.resolve(t.context.tmpDir, file));
	t.deepEqual(filesBefore, filesAfter);
});

test('sync (only directory test files with rule)', t => {
	let filesBefore = fs.readdirSync(t.context.tmpDir);
	filesBefore = filesBefore.map(file => file.replace(/(\w+).txt/, '$1_001.txt'));
	filesBefore.sort();
	fn.sync(t.context.tmpDir, '$_001');
	let filesAfter = fs.readdirSync(t.context.tmpDir);
	filesAfter.sort();
	t.context.tmpFiles = filesAfter.map(file => path.resolve(t.context.tmpDir, file));
	t.deepEqual(filesBefore, filesAfter);
});

test('async (only directory not exist test result)', async t => {
	const result = await fn('/the/not/exited/path');
	t.is(result, false);
});

test('sync (only directory not exist test result)', t => {
	const result = fn.sync('/the/not/exited/path');
	t.is(result, false);
});


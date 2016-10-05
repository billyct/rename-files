'use strict';

const fs = require('fs');
const path = require('path');
const pathExists = require('path-exists');

module.exports = (pattern = '', replace = '', options = {path: __dirname}) => {
	options = options || {
		path: __dirname
	};
	/* eslint promise/param-names: 0 */
	return new Promise(resolveMain => {
		pathExists(options.path).then(exits => {
			if (exits) {
				fs.readdir(options.path, (err, files) => {
					if (err) {
						resolveMain(false);
					}

					let promises = [];

					files.forEach(file => {
						let oldPath = path.resolve(options.path, file);
						let newPath = path.resolve(options.path, getNewFileName(file, pattern, replace));
						promises.push(new Promise((resolve, reject) => {
							fs.rename(oldPath, newPath, err => {
								if (err) {
									reject();
								}
								resolve();
							});
						}));
					});

					Promise.all(promises).then(() => {
						resolveMain(true);
					}).catch(() => {
						resolveMain(false);
					});
				});
			} else {
				resolveMain(false);
			}
		});
	});
};

module.exports.sync = (pattern = '', replace = '', options = {path: __dirname}) => {
	if (pathExists.sync(options.path)) {
		let files = fs.readdirSync(options.path);

		files.forEach(file => {
			let oldPath = path.resolve(options.path, file);
			let newPath = path.resolve(options.path, getNewFileName(file, pattern, replace));
			let result = fs.renameSync(oldPath, newPath);
			if (!result) {
				return false;
			}
		});

		return true;
	}

	return false;
};

function getNewFileName(filename, pattern, replace) {
	const reg = new RegExp(pattern);
	return filename.replace(reg, replace);
}

module.exports.getNewFileName = getNewFileName;

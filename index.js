'use strict';

const fs = require('fs');
const path = require('path');
const pathExists = require('path-exists');

module.exports = (directory, rule) => {
	/* eslint promise/param-names: 0 */
	return new Promise(resolveMain => {
		pathExists(directory).then(exits => {
			if (exits) {
				fs.readdir(directory, (err, files) => {
					if (err) {
						resolveMain(false);
					}

					let promises = [];

					rule = rule || '$';

					files.forEach(file => {
						let oldPath = path.resolve(directory, file);
						let newPath = getNewPath(directory, file, rule);
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

module.exports.sync = (directory, rule) => {
	if (pathExists.sync(directory)) {
		let files = fs.readdirSync(directory);
		rule = rule || '$';

		files.forEach(file => {
			let oldPath = path.resolve(directory, file);
			let newPath = getNewPath(directory, file, rule);
			let result = fs.renameSync(oldPath, newPath);
			if (!result) {
				return false;
			}
		});

		return true;
	}

	return false;
};

function getNewPath(directory, file, rule) {
	const ext = path.extname(file);
	const filename = file.replace(ext, '');
	let newPath = path.resolve(directory, rule.replace('$', filename) + ext);
	return newPath;
}

module.exports.getNewPath = getNewPath;

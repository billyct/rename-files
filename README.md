# rename-files-under
[![Build Status](https://travis-ci.org/billyct/happycalculator.svg?branch=master)](https://travis-ci.org/billyct/happycalculator)
> rename files name under a folder with a simple rule

## install
```
$ npm install --save rename-files-under
```

## usage
```
/
└── foo
	├── 1.png
    ├── 2.png
    ├── 3.jpg
    ├── 4.jpg
    └── 5.png
```

```
//example.js
const renameFilesUnder = require('rename-files-under');
renameFilesUnder('/foo', '$_001').then(result => {
	if (result) {
		console.log('rename successs');
	}
});

//will change to

/
└── foo
	├── 1_001.png
    ├── 2_001.png
    ├── 3_001.jpg
    ├── 4_001.jpg
    └── 5_001.png
```


## API
#### renameFilesUnder(directory, rule)
Return a `Promise` for true or false.
#### renameFilesUnder.sync(directory, rule)
return true or false

##### directory
Type: `string`
path of the files should be change

##### rule
Type: `string`
simple rule that `$` for the filename without extension


## LICENSE
MIT @[billyct](http://billyct.com)
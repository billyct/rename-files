# rename-files
[![Build Status](https://travis-ci.org/billyct/rename-files.svg?branch=master)](https://travis-ci.org/billyct/rename-files)
> rename files with pattern like String.replace(pattern, replace)

## install
```
$ npm install --save rename-files-b
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
const renameFiles = require('rename-files-b');
renameFiles('(\\w+).(png|jpg)', '$1_001.$2', {path: '/foo'}).then(result => {
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
#### renameFiles(pattern, replace, [options])
Return a `Promise` for true or false.
#### renameFiles.sync(pattern, replace, [options])
return true or false

##### pattern
Type: `string` || RegExp
what you want replace

##### replace
Type: `string`
what you want replace to

##### options
Type: `object`
###### path
Type: `string`
the path has lots files



## LICENSE
MIT @[billyct](http://billyct.com)
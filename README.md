# rename-files
> rename files name with a simple rule under a folder

## install
```
$ npm install --save rename-files
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
const renameFiles = require('rename-files');
renameFiles('/foo', '$_001').then(result => {
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
#### renameFiles(directory, rule)
Return a `Promise` for true or false.
#### renameFile.sync(directory, rule)
return true or false

##### directory
Type: `string`
path of the files should be change

##### rule
Type: `string`
simple rule that `$` for the filename without extension


## LICENSE
MIT @[billyct](http://billyct.com)
# collect-transform-stream

> create a transform stream that runs a function over all collected elements

Sometimes you end up in a situation where you have a stream pipeline like

```js
pump(source, transform, destination)
```

but you have another transform function that needs to process all elements in
the stream before passing them on, e.g. filtering duplicates from an unordered
stream:

```js
pump(source, collectAndFilter, transform, destination)
```

`collect-transform-stream` is a tiny module that provides this.

## Usage

```js
var collect = require('collect-transform-stream')
var uniq = require('uniq')
var from = require('from2')

var source = from.obj(new Array(100).fill(0).map(function () {
  return Math.floor(Math.random() * 10)
}))

var dedupe = collect(function (nums) {
  return uniq(nums)
})

source.pipe(dedupe)

dedupe.on('data', function (n) {
  console.log(n)
})
```

outputs

```
0
1
2
3
4
5
6
7
8
9
```

## API

```js
var collect = require('collect-transform-stream')
```

### collect(fn[, cb])

Create a Transform stream that runs the function `fn` on all incoming objects at
once, then pipes elements individually onward to the next stream in the
pipeline.

Use `return result` to use synchronously; call `cb(err, result)` to use
asynchronously.

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install collect-transform-stream
```

## License

ISC


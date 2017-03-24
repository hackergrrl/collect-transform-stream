var test = require('tape')
var uniq = require('uniq')
var from = require('from2')
var collect = require('concat-stream')

var collectTransform = require('../')

test('uniq', function (t) {
  t.plan(1)

  var source = from.obj(new Array(500).fill(0).map(function () {
    return Math.floor(Math.random() * 10)
  }))

  var dedupe = collectTransform(function (nums) {
    return uniq(nums)
  })

  var dest = collect({encoding:'object'}, function (res) {
    t.deepEqual(res, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  source.pipe(dedupe).pipe(dest)
})

var through = require('through2')
var once = require('once')

// Transform stream that performs 'fn' on an array of all elements in the
// stream, and then passes on the resulting array onto the other end of the
// stream.
module.exports = function (fn) {
  var elements = []

  function write (elm, enc, next) {
    elements.push(elm)
    next()
  }

  function end (flush) {
    var that = this

    done = once(done)
    elements = fn(elements, done)
    if (elements) done(null, elements)

    function done (err, elements) {
      elements.forEach(function (elm) {
        that.push(elm)
      })
      flush()
    }
  }

  return through.obj(write, end)
}

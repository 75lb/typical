'use strict'
var test = require('tape')
var type = require('../')

function evaluates (statement) {
  try {
    eval(statement)
    return true
  } catch (err) {
    return false
  }
}

test('.isNumber(value)', function (t) {
  t.equal(type.isNumber(0), true)
  t.equal(type.isNumber(1), true)
  t.equal(type.isNumber(1.1), true)
  t.equal(type.isNumber(0xff), true)
  t.equal(type.isNumber(6.2e5), true)
  t.equal(type.isNumber(NaN), false)
  t.equal(type.isNumber(Infinity), false)
  t.end()
})

test('.isPlainObject(value)', function (t) {
  t.equal(type.isPlainObject({ clive: 'hater' }), true, '{} is true')
  t.equal(type.isPlainObject(new Date()), false, 'new Date() is false')
  t.equal(type.isPlainObject([ 0, 1 ]), false, 'Array is false')
  t.equal(type.isPlainObject(/test/), false, 'RegExp is false')
  t.equal(type.isPlainObject(1), false, '1 is false')
  t.equal(type.isPlainObject('one'), false, "'one' is false")
  t.equal(type.isPlainObject(null), false, 'null is false')
  t.end()
})

test('.isPlainObject(value)', function (t) {
  t.strictEqual(type.isDefined({}), true)
  t.strictEqual(type.isDefined({}.one), false)
  t.strictEqual(type.isDefined(0), true)
  t.strictEqual(type.isDefined(null), true)
  t.strictEqual(type.isDefined(undefined), false)
  t.end()
})

test('.isString(value)', function (t) {
  t.equal(type.isString(0), false)
  t.equal(type.isString('1'), true)
  t.equal(type.isString(1.1), false)
  t.equal(type.isString(NaN), false)
  t.equal(type.isString(Infinity), false)
  t.end()
})

test('.isBoolean(value)', function (t) {
  t.equal(type.isBoolean(true), true)
  t.equal(type.isBoolean(false), true)
  t.equal(type.isBoolean(0), false)
  t.equal(type.isBoolean('1'), false)
  t.equal(type.isBoolean(1.1), false)
  t.equal(type.isBoolean(NaN), false)
  t.equal(type.isBoolean(Infinity), false)
  t.end()
})

test('.isFunction(value)', function (t) {
  t.equal(type.isFunction(true), false)
  t.equal(type.isFunction({}), false)
  t.equal(type.isFunction(0), false)
  t.equal(type.isFunction('1'), false)
  t.equal(type.isFunction(1.1), false)
  t.equal(type.isFunction(NaN), false)
  t.equal(type.isFunction(Infinity), false)
  t.equal(type.isFunction(function(){}), true)
  t.equal(type.isFunction(Date), true)
  t.end()
})

if (evaluates('class Something {}')) {
  test('.isClass(value)', function (t) {
    t.equal(type.isClass(true), false)
    t.equal(type.isClass({}), false)
    t.equal(type.isClass(0), false)
    t.equal(type.isClass('1'), false)
    t.equal(type.isClass(1.1), false)
    t.equal(type.isClass(NaN), false)
    t.equal(type.isClass(Infinity), false)
    t.equal(type.isClass(function(){}), false)
    var result = eval('type.isClass(class {})')
    t.equal(result, true)
    t.equal(type.isClass(Date), false)
    t.equal(type.isClass(), false)

    function broken () { }
    broken.toString = function () { throw new Error() }
    t.equal(type.isClass(broken), false)

    t.end()
  })
}

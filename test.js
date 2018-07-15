const TestRunner = require('test-runner')
const t = require('./')
const runner = new TestRunner()
const a = require('assert')

function evaluates (statement) {
  try {
    eval(statement)
    return true
  } catch (err) {
    return false
  }
}

runner.test('.isNumber(value)', function () {
  a.strictEqual(t.isNumber(0), true)
  a.strictEqual(t.isNumber(1), true)
  a.strictEqual(t.isNumber(1.1), true)
  a.strictEqual(t.isNumber(0xff), true)
  a.strictEqual(t.isNumber(6.2e5), true)
  a.strictEqual(t.isNumber(NaN), false)
  a.strictEqual(t.isNumber(Infinity), false)
})

runner.test('.isPlainObject(value)', function () {
  a.strictEqual(t.isPlainObject({ clive: 'hater' }), true, '{} is true')
  a.strictEqual(t.isPlainObject(new Date()), false, 'new Date() is false')
  a.strictEqual(t.isPlainObject([ 0, 1 ]), false, 'Array is false')
  a.strictEqual(t.isPlainObject(/test/), false, 'RegExp is false')
  a.strictEqual(t.isPlainObject(1), false, '1 is false')
  a.strictEqual(t.isPlainObject('one'), false, "'one' is false")
  a.strictEqual(t.isPlainObject(null), false, 'null is false')
})

runner.test('.isDefined(value)', function () {
  a.strictEqual(t.isDefined({}), true)
  a.strictEqual(t.isDefined({}.one), false)
  a.strictEqual(t.isDefined(0), true)
  a.strictEqual(t.isDefined(null), true)
  a.strictEqual(t.isDefined(undefined), false)
})

runner.test('.isString(value)', function () {
  a.strictEqual(t.isString(0), false)
  a.strictEqual(t.isString('1'), true)
  a.strictEqual(t.isString(1.1), false)
  a.strictEqual(t.isString(NaN), false)
  a.strictEqual(t.isString(Infinity), false)
})

runner.test('.isBoolean(value)', function () {
  a.strictEqual(t.isBoolean(true), true)
  a.strictEqual(t.isBoolean(false), true)
  a.strictEqual(t.isBoolean(0), false)
  a.strictEqual(t.isBoolean('1'), false)
  a.strictEqual(t.isBoolean(1.1), false)
  a.strictEqual(t.isBoolean(NaN), false)
  a.strictEqual(t.isBoolean(Infinity), false)
})

runner.test('.isFunction(value)', function () {
  a.strictEqual(t.isFunction(true), false)
  a.strictEqual(t.isFunction({}), false)
  a.strictEqual(t.isFunction(0), false)
  a.strictEqual(t.isFunction('1'), false)
  a.strictEqual(t.isFunction(1.1), false)
  a.strictEqual(t.isFunction(NaN), false)
  a.strictEqual(t.isFunction(Infinity), false)
  a.strictEqual(t.isFunction(function () {}), true)
  a.strictEqual(t.isFunction(Date), true)
})

runner.test('.isPrimitive(value)', function () {
  a.strictEqual(t.isPrimitive(true), true)
  a.strictEqual(t.isPrimitive({}), false)
  a.strictEqual(t.isPrimitive(0), true)
  a.strictEqual(t.isPrimitive('1'), true)
  a.strictEqual(t.isPrimitive(1.1), true)
  a.strictEqual(t.isPrimitive(NaN), true)
  a.strictEqual(t.isPrimitive(Infinity), true)
  a.strictEqual(t.isPrimitive(function () {}), false)
  a.strictEqual(t.isPrimitive(Date), false)
  a.strictEqual(t.isPrimitive(null), true)
  a.strictEqual(t.isPrimitive(undefined), true)
})

runner.test('.isPrimitive(value) ES6', function () {
  a.strictEqual(t.isPrimitive(Symbol()), true)
})

runner.test('.isClass(value)', function () {
  a.strictEqual(t.isClass(true), false)
  a.strictEqual(t.isClass({}), false)
  a.strictEqual(t.isClass(0), false)
  a.strictEqual(t.isClass('1'), false)
  a.strictEqual(t.isClass(1.1), false)
  a.strictEqual(t.isClass(NaN), false)
  a.strictEqual(t.isClass(Infinity), false)
  a.strictEqual(t.isClass(function () {}), false)
  a.strictEqual(t.isClass(Date), false)
  a.strictEqual(t.isClass(), false)

  function broken () { }
  broken.toString = function () { throw new Error() }
  a.strictEqual(t.isClass(broken), false)
})

runner.test('.isClass(value) ES6', function () {
  const result = eval('t.isClass(class {})')
  a.strictEqual(result, true)
})

runner.test('.isPromise', function () {
  a.strictEqual(t.isPromise(Promise.resolve()), true)
  a.strictEqual(t.isPromise(Promise), false)
  a.strictEqual(t.isPromise(true), false)
  a.strictEqual(t.isPromise({}), false)
  a.strictEqual(t.isPromise(0), false)
  a.strictEqual(t.isPromise('1'), false)
  a.strictEqual(t.isPromise(1.1), false)
  a.strictEqual(t.isPromise(NaN), false)
  a.strictEqual(t.isPromise(Infinity), false)
  a.strictEqual(t.isPromise(function () {}), false)
  a.strictEqual(t.isPromise(Date), false)
  a.strictEqual(t.isPromise(), false)
  a.strictEqual(t.isPromise({ then: function () {} }), true)
})

runner.test('.isIterable', function () {
  a.strictEqual(t.isIterable(Promise.resolve()), false)
  a.strictEqual(t.isIterable(Promise), false)
  a.strictEqual(t.isIterable(true), false)
  a.strictEqual(t.isIterable({}), false)
  a.strictEqual(t.isIterable(0), false)
  a.strictEqual(t.isIterable('1'), true)
  a.strictEqual(t.isIterable(1.1), false)
  a.strictEqual(t.isIterable(NaN), false)
  a.strictEqual(t.isIterable(Infinity), false)
  a.strictEqual(t.isIterable(function () {}), false)
  a.strictEqual(t.isIterable(Date), false)
  a.strictEqual(t.isIterable(), false)
  a.strictEqual(t.isIterable(new Map()), true)
  a.strictEqual(t.isIterable([]), true)
  a.strictEqual(t.isIterable({ then: function () {} }), false)
})

runner.test('.isObject', function () {
  a.strictEqual(t.isObject(Promise.resolve()), true)
  a.strictEqual(t.isObject(Promise), false)
  a.strictEqual(t.isObject(true), false)
  a.strictEqual(t.isObject({}), true)
  a.strictEqual(t.isObject(0), false)
  a.strictEqual(t.isObject('1'), false)
  a.strictEqual(t.isObject(1.1), false)
  a.strictEqual(t.isObject(NaN), false)
  a.strictEqual(t.isObject(Infinity), false)
  a.strictEqual(t.isObject(function () {}), false)
  a.strictEqual(t.isObject(Date), false)
  a.strictEqual(t.isObject(), false)
  a.strictEqual(t.isObject(new Map()), true)
  a.strictEqual(t.isObject([]), true)
  a.strictEqual(t.isObject({ then: function () {} }), true)
})

runner.test('.isArrayLike', function () {
  a.strictEqual(t.isArrayLike(arguments), true)
  a.strictEqual(t.isArrayLike(Promise.resolve()), false)
  a.strictEqual(t.isArrayLike(Promise), false)
  a.strictEqual(t.isArrayLike(true), false)
  a.strictEqual(t.isArrayLike({}), false)
  a.strictEqual(t.isArrayLike(0), false)
  a.strictEqual(t.isArrayLike('1'), false)
  a.strictEqual(t.isArrayLike(1.1), false)
  a.strictEqual(t.isArrayLike(NaN), false)
  a.strictEqual(t.isArrayLike(Infinity), false)
  a.strictEqual(t.isArrayLike(function () {}), false)
  a.strictEqual(t.isArrayLike(Date), false)
  a.strictEqual(t.isArrayLike(), false)
  a.strictEqual(t.isArrayLike(new Map()), false)
  a.strictEqual(t.isArrayLike([]), true)
  a.strictEqual(t.isArrayLike({ then: function () {} }), false)
})

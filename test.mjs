import Tom from './node_modules/test-object-model/dist/index.mjs'
import * as t from './index.mjs'
const tom = new Tom('typical')
let a

async function start () {
  /* isomorphic: load assertion library */
  if (typeof window === 'undefined') {
    a = await import('assert')
  } else {
    await import('https://www.chaijs.com/chai.js')
    a = window.chai.assert
    window.tom = tom
  }

  tom.test('.isNumber(value)', function () {
    a.strictEqual(t.isNumber(0), true)
    a.strictEqual(t.isNumber(1), true)
    a.strictEqual(t.isNumber(1.1), true)
    a.strictEqual(t.isNumber(0xff), true)
    a.strictEqual(t.isNumber(6.2e5), true)
    a.strictEqual(t.isNumber(NaN), false)
    a.strictEqual(t.isNumber(Infinity), false)
  })

  tom.test('.isPlainObject(value)', function () {
    a.strictEqual(t.isPlainObject({ clive: 'hater' }), true, '{} is true')
    a.strictEqual(t.isPlainObject(new Date()), false, 'new Date() is false')
    a.strictEqual(t.isPlainObject([ 0, 1 ]), false, 'Array is false')
    a.strictEqual(t.isPlainObject(/test/), false, 'RegExp is false')
    a.strictEqual(t.isPlainObject(1), false, '1 is false')
    a.strictEqual(t.isPlainObject('one'), false, "'one' is false")
    a.strictEqual(t.isPlainObject(null), false, 'null is false')
    a.strictEqual(t.isPlainObject((function * () {})()), false)
    a.strictEqual(t.isPlainObject(function * () {}), false)
  })

  tom.test('.isDefined(value)', function () {
    a.strictEqual(t.isDefined({}), true)
    a.strictEqual(t.isDefined({}.one), false)
    a.strictEqual(t.isDefined(0), true)
    a.strictEqual(t.isDefined(null), true)
    a.strictEqual(t.isDefined(undefined), false)
  })

  tom.test('.isPrimitive(value)', function () {
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

  tom.test('.isPrimitive(value) ES6', function () {
    a.strictEqual(t.isPrimitive(Symbol()), true)
  })

  tom.test('.isClass(value)', function () {
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
    a.strictEqual(t.isClass(class {}), true)

    function broken () { }
    broken.toString = function () { throw new Error() }
    a.strictEqual(t.isClass(broken), false)
  })

  tom.test('.isPromise', function () {
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

  tom.test('.isObject', function () {
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

  tom.test('.isArrayLike', function () {
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

  tom.test('.isIterable', function () {
    a.strictEqual(t.isIterable(Promise.resolve()), false)
    a.strictEqual(t.isIterable(Promise), false)
    a.strictEqual(t.isIterable(true), false)
    a.strictEqual(t.isIterable({}), false)
    a.strictEqual(t.isIterable(0), false)
    a.strictEqual(t.isIterable('1'), true)
    a.strictEqual(t.isIterable(1.1), false)
    a.strictEqual(t.isIterable(null), false)
    a.strictEqual(t.isIterable(undefined), false)
    a.strictEqual(t.isIterable(NaN), false)
    a.strictEqual(t.isIterable(Infinity), false)
    a.strictEqual(t.isIterable(function () {}), false)
    a.strictEqual(t.isIterable(Date), false)
    a.strictEqual(t.isIterable(), false)
    a.strictEqual(t.isIterable(new Map()), true)
    a.strictEqual(t.isIterable([]), true)
    a.strictEqual(t.isIterable({ then: function () {} }), false)
    a.strictEqual(t.isIterable((function * () {})()), true)
  })
}

start().catch(console.error)
export default tom

import Tom from 'test-object-model'
import * as t from '../index.mjs'
import getAssert from 'isomorphic-assert'

async function getTom () {
  const tom = new Tom()
  const a = await getAssert()

  tom.test('.isNumber(value)', function () {
    a.equal(t.isNumber(0), true)
    a.equal(t.isNumber(1), true)
    a.equal(t.isNumber(1.1), true)
    a.equal(t.isNumber(0xff), true)
    a.equal(t.isNumber(6.2e5), true)
    a.equal(t.isNumber(NaN), false)
    a.equal(t.isNumber(Infinity), false)
  })

  tom.test('.isPlainObject(value)', function () {
    a.equal(t.isPlainObject({ clive: 'hater' }), true, '{} is true')
    a.equal(t.isPlainObject(new Date()), false, 'new Date() is false')
    a.equal(t.isPlainObject([ 0, 1 ]), false, 'Array is false')
    a.equal(t.isPlainObject(/test/), false, 'RegExp is false')
    a.equal(t.isPlainObject(1), false, '1 is false')
    a.equal(t.isPlainObject('one'), false, "'one' is false")
    a.equal(t.isPlainObject(null), false, 'null is false')
    a.equal(t.isPlainObject((function * () {})()), false)
    a.equal(t.isPlainObject(function * () {}), false)
  })

  tom.test('.isDefined(value)', function () {
    a.equal(t.isDefined({}), true)
    a.equal(t.isDefined({}.one), false)
    a.equal(t.isDefined(0), true)
    a.equal(t.isDefined(null), true)
    a.equal(t.isDefined(undefined), false)
  })

  tom.test('.isUndefined(value)', function () {
    a.equal(t.isUndefined({}), false)
    a.equal(t.isUndefined({}.one), true)
    a.equal(t.isUndefined(0), false)
    a.equal(t.isUndefined(null), false)
    a.equal(t.isUndefined(undefined), true)
  })

  tom.test('.isNull(value)', function () {
    a.equal(t.isNull({}), false)
    a.equal(t.isNull({}.one), false)
    a.equal(t.isNull(0), false)
    a.equal(t.isNull(null), true)
    a.equal(t.isNull(undefined), false)
  })

  tom.test('.isPrimitive(value)', function () {
    a.equal(t.isPrimitive(true), true)
    a.equal(t.isPrimitive({}), false)
    a.equal(t.isPrimitive(0), true)
    a.equal(t.isPrimitive('1'), true)
    a.equal(t.isPrimitive(1.1), true)
    a.equal(t.isPrimitive(NaN), true)
    a.equal(t.isPrimitive(Infinity), true)
    a.equal(t.isPrimitive(function () {}), false)
    a.equal(t.isPrimitive(Date), false)
    a.equal(t.isPrimitive(null), true)
    a.equal(t.isPrimitive(undefined), true)
  })

  tom.test('.isDefinedValue(value)', function () {
    a.equal(t.isDefinedValue(true), true)
    a.equal(t.isDefinedValue({}), true)
    a.equal(t.isDefinedValue(0), true)
    a.equal(t.isDefinedValue('1'), true)
    a.equal(t.isDefinedValue(1.1), true)
    a.equal(t.isDefinedValue(NaN), false)
    a.equal(t.isDefinedValue(Infinity), true)
    a.equal(t.isDefinedValue(function () {}), true)
    a.equal(t.isDefinedValue(Date), true)
    a.equal(t.isDefinedValue(null), false)
    a.equal(t.isDefinedValue(undefined), false)
  })

  tom.test('.isPrimitive(value) ES6', function () {
    a.equal(t.isPrimitive(Symbol()), true)
  })

  tom.test('.isClass(value)', function () {
    a.equal(t.isClass(true), false)
    a.equal(t.isClass({}), false)
    a.equal(t.isClass(0), false)
    a.equal(t.isClass('1'), false)
    a.equal(t.isClass(1.1), false)
    a.equal(t.isClass(NaN), false)
    a.equal(t.isClass(Infinity), false)
    a.equal(t.isClass(function () {}), false)
    a.equal(t.isClass(Date), false)
    a.equal(t.isClass(), false)
    a.equal(t.isClass(class {}), true)

    function broken () { }
    broken.toString = function () { throw new Error() }
    a.equal(t.isClass(broken), false)
  })

  tom.test('.isPromise', function () {
    a.equal(t.isPromise(Promise.resolve()), true)
    a.equal(t.isPromise(Promise), false)
    a.equal(t.isPromise(true), false)
    a.equal(t.isPromise({}), false)
    a.equal(t.isPromise(0), false)
    a.equal(t.isPromise('1'), false)
    a.equal(t.isPromise(1.1), false)
    a.equal(t.isPromise(NaN), false)
    a.equal(t.isPromise(Infinity), false)
    a.equal(t.isPromise(function () {}), false)
    a.equal(t.isPromise(Date), false)
    a.equal(t.isPromise(), false)
    a.equal(t.isPromise({ then: function () {} }), true)
  })

  tom.test('.isObject', function () {
    a.equal(t.isObject(Promise.resolve()), true)
    a.equal(t.isObject(Promise), false)
    a.equal(t.isObject(true), false)
    a.equal(t.isObject({}), true)
    a.equal(t.isObject(0), false)
    a.equal(t.isObject('1'), false)
    a.equal(t.isObject(1.1), false)
    a.equal(t.isObject(NaN), false)
    a.equal(t.isObject(Infinity), false)
    a.equal(t.isObject(function () {}), false)
    a.equal(t.isObject(Date), false)
    a.equal(t.isObject(), false)
    a.equal(t.isObject(new Map()), true)
    a.equal(t.isObject([]), true)
    a.equal(t.isObject({ then: function () {} }), true)
  })

  tom.test('.isArrayLike', function () {
    a.equal(t.isArrayLike(arguments), true)
    a.equal(t.isArrayLike(Promise.resolve()), false)
    a.equal(t.isArrayLike(Promise), false)
    a.equal(t.isArrayLike(true), false)
    a.equal(t.isArrayLike({}), false)
    a.equal(t.isArrayLike(0), false)
    a.equal(t.isArrayLike('1'), false)
    a.equal(t.isArrayLike(1.1), false)
    a.equal(t.isArrayLike(NaN), false)
    a.equal(t.isArrayLike(Infinity), false)
    a.equal(t.isArrayLike(function () {}), false)
    a.equal(t.isArrayLike(Date), false)
    a.equal(t.isArrayLike(), false)
    a.equal(t.isArrayLike(new Map()), false)
    a.equal(t.isArrayLike([]), true)
    a.equal(t.isArrayLike({ then: function () {} }), false)
  })

  tom.test('.isIterable', function () {
    a.equal(t.isIterable(Promise.resolve()), false)
    a.equal(t.isIterable(Promise), false)
    a.equal(t.isIterable(true), false)
    a.equal(t.isIterable({}), false)
    a.equal(t.isIterable(0), false)
    a.equal(t.isIterable('1'), true)
    a.equal(t.isIterable(1.1), false)
    a.equal(t.isIterable(null), false)
    a.equal(t.isIterable(undefined), false)
    a.equal(t.isIterable(NaN), false)
    a.equal(t.isIterable(Infinity), false)
    a.equal(t.isIterable(function () {}), false)
    a.equal(t.isIterable(Date), false)
    a.equal(t.isIterable(), false)
    a.equal(t.isIterable(new Map()), true)
    a.equal(t.isIterable([]), true)
    a.equal(t.isIterable({ then: function () {} }), false)
    a.equal(t.isIterable((function * () {})()), true)
  })

  tom.test('.isIterable [v10]', function () {
    a.equal(t.isIterable((async function * () {})()), true)
  })

  tom.test('.isString', function () {
    a.equal(t.isString('1'), true)
    a.equal(t.isString(1), false)
  })

  tom.test('.isFunction', function () {
    a.equal(t.isFunction(function () {}), true)
    a.equal(t.isFunction('function () {}'), false)
  })

  return tom
}

export default getTom()

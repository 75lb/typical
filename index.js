/**
 * Isomorphic, functional type-checking for Javascript.
 * @module typical
 * @typicalname t
 * @example
 * import * as t from 'typical'
 * const allDefined = array.every(t.isDefined)
 */

/**
 * Returns true if input is a number (including infinity). It is a more reasonable alternative to `typeof n` which returns `number` for `NaN`.
 *
 * @param {*} n - The input to test
 * @returns {boolean} `true` if input is a number
 * @static
 * @example
 * > t.isNumber(0)
 * true
 * > t.isNumber(1)
 * true
 * > t.isNumber(1.1)
 * true
 * > t.isNumber(0xff)
 * true
 * > t.isNumber(0644)
 * true
 * > t.isNumber(6.2e5)
 * true
 * > t.isNumber(NaN)
 * false
 * > t.isNumber(Infinity)
 * true
 */
export function isNumber (n) {
  return !isNaN(parseFloat(n))
}

/**
 * Returns true if input is a finite number. Identical to `isNumber` beside excluding infinity.
 *
 * @param {*} n - The input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isFiniteNumber(0)
 * true
 * > t.isFiniteNumber(1)
 * true
 * > t.isFiniteNumber(1.1)
 * true
 * > t.isFiniteNumber(0xff)
 * true
 * > t.isFiniteNumber(0644)
 * true
 * > t.isFiniteNumber(6.2e5)
 * true
 * > t.isFiniteNumber(NaN)
 * false
 * > t.isFiniteNumber(Infinity)
 * false
 */
export function isFiniteNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

/**
 * A plain object is a simple object literal, it is not an instance of a class. Returns true if the input `typeof` is `object` and directly decends from `Object`.
 *
 * @param {*} input - The input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isPlainObject({ something: 'one' })
 * true
 * > t.isPlainObject(new Date())
 * false
 * > t.isPlainObject([ 0, 1 ])
 * false
 * > t.isPlainObject(/test/)
 * false
 * > t.isPlainObject(1)
 * false
 * > t.isPlainObject('one')
 * false
 * > t.isPlainObject(null)
 * false
 * > t.isPlainObject((function * () {})())
 * false
 * > t.isPlainObject(function * () {})
 * false
 */
export function isPlainObject (input) {
  return input !== null && typeof input === 'object' && input.constructor === Object
}

/**
 * An array-like value has all the properties of an array yet is not an array instance. An example is the `arguments` object. Returns `true`` if the input value is an object, not `null`` and has a `length` property set with a numeric value.
 *
 * @param {*} input - The input to test
 * @returns {boolean}
 * @static
 * @example
 * function sum(x, y){
 *   console.log(t.isArrayLike(arguments))
 *   // prints `true`
 * }
 */
export function isArrayLike (input) {
  return isObject(input) && typeof input.length === 'number'
}

/**
 * Returns true if the typeof input is `'object'` but not null.
 * @param {*} input - The input to test
 * @returns {boolean}
 * @static
 */
export function isObject (input) {
  return typeof input === 'object' && input !== null
}

/**
 * Returns true if the input value is defined.
 * @param {*} input - The input to test
 * @returns {boolean}
 * @static
 */
export function isDefined (input) {
  return typeof input !== 'undefined'
}

/**
 * Returns true if the input value is undefined.
 * @param {*} input - The input to test
 * @returns {boolean}
 * @static
 */
export function isUndefined (input) {
  return !isDefined(input)
}

/**
 * Returns true if the input value is null.
 * @param {*} input - The input to test
 * @returns {boolean}
 * @static
 */
export function isNull (input) {
  return input === null
}

/**
 * Returns true if the input value is not one of `undefined`, `null`, or `NaN`.
 * @param {*} input - The input to test
 * @returns {boolean}
 * @static
 */
export function isDefinedValue (input) {
  return isDefined(input) && !isNull(input) && !Number.isNaN(input)
}

/**
 * Returns true if the input value is an ES2015 `class`.
 * @param {*} input - The input to test
 * @returns {boolean}
 * @static
 */
export function isClass (input) {
  if (typeof input === 'function') {
    return /^class /.test(Function.prototype.toString.call(input))
  } else {
    return false
  }
}

/**
 * Returns true if the input is a string, number, symbol, boolean, null or undefined value.
 * @param {*} input - The input to test
 * @returns {boolean}
 * @static
 */
export function isPrimitive (input) {
  if (input === null) return true
  switch (typeof input) {
    case 'string':
    case 'number':
    case 'symbol':
    case 'undefined':
    case 'boolean':
      return true
    default:
      return false
  }
}

/**
 * Returns true if the input is a Promise.
 * @param {*} input - The input to test
 * @returns {boolean}
 * @static
 */
export function isPromise (input) {
  if (input) {
    const isPromise = isDefined(Promise) && input instanceof Promise
    const isThenable = input.then && typeof input.then === 'function'
    return !!(isPromise || isThenable)
  } else {
    return false
  }
}

/**
 * Returns true if the input is an iterable (`Map`, `Set`, `Array`, Generator etc.).
 * @param {*} input - The input to test
 * @returns {boolean}
 * @static
 * @example
 * > t.isIterable('string')
 * true
 * > t.isIterable(new Map())
 * true
 * > t.isIterable([])
 * true
 * > t.isIterable((function * () {})())
 * true
 * > t.isIterable(Promise.resolve())
 * false
 * > t.isIterable(Promise)
 * false
 * > t.isIterable(true)
 * false
 * > t.isIterable({})
 * false
 * > t.isIterable(0)
 * false
 * > t.isIterable(1.1)
 * false
 * > t.isIterable(NaN)
 * false
 * > t.isIterable(Infinity)
 * false
 * > t.isIterable(function () {})
 * false
 * > t.isIterable(Date)
 * false
 * > t.isIterable()
 * false
 * > t.isIterable({ then: function () {} })
 * false
 */
export function isIterable (input) {
  if (input === null || !isDefined(input)) {
    return false
  } else {
    return (
      typeof input[Symbol.iterator] === 'function' ||
      typeof input[Symbol.asyncIterator] === 'function'
    )
  }
}

/**
 * Returns true if the input value is a string. The equivalent of `typeof input === 'string'` for use in funcitonal contexts.
 * @param {*} input - The input to test
 * @returns {boolean}
 * @static
 */
export function isString (input) {
  return typeof input === 'string'
}

/**
 * Returns true if the input value is a function. The equivalent of `typeof input === 'function'` for use in funcitonal contexts.
 * @param {*} input - The input to test
 * @returns {boolean}
 * @static
 */
export function isFunction (input) {
  return typeof input === 'function'
}

export default {
  isNumber,
  isFiniteNumber,
  isPlainObject,
  isArrayLike,
  isObject,
  isDefined,
  isUndefined,
  isNull,
  isDefinedValue,
  isClass,
  isPrimitive,
  isPromise,
  isIterable,
  isString,
  isFunction
}

/* TODO:
- quickMatch function to replace the most common Params
- quickMatch for named export
- combine into one quickMatch for all common data
 */


/*~
typical ¬typical¬

Isomorphic, functional type-checking for Javascript. Packaging each test as a function facilitates compact code where a callback is expected.

Example (js)
  import { isDefined } from 'typical'
  const allDefined = array.every(isDefined)
*/

/*~
isNumber (n) : boolean [boolFunc] ¬typical > isNumber¬

Returns true if input is a number (including infinity). It is a more reasonable alternative to `typeof n` which returns `number` for `NaN`.

Data
  exportType: Named

Params
  Param | Type | Description
  ---   | ---  | ---
  n     | *    | The input to test

Code /*>>*/
export function isNumber (n) {
  return !isNaN(Number.parseFloat(n))
}
/*<<*/

/*~
isFiniteNumber (n) : boolean [boolFunc] ¬typical > isFiniteNumber¬

Returns true if input is a finite number. Identical to `isNumber` beside excluding infinity.

Params
  Param | Type | Description
  ---   | ---  | ---
  n     | *    | The input to test

Data
  exportType: Named

Code /*>>*/
export function isFiniteNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
/*<<*/

/*~
isPlainObject (input) : boolean [boolFunc] ¬typical > isPlainObject¬

A plain object is a simple object literal that is not an instance of a class. Returns `true` if the input `typeof` is `object` and is not `null` plus either has a _direct_ prototype of `Object.prototype` or `null`.

Params
  Param | Type | Description
  ---   | ---  | ---
  Input | *    | The input to test

Data
  exportType: Named

Code /*>>*/
export function isPlainObject (input) {
  if (typeof input !== 'object' || input === null) {
    return false
  } else {
    const proto = Object.getPrototypeOf(input)
    return proto === null || proto === Object.prototype
  }
}
/*<<*/

/*~
isArrayLike (input) : boolean [boolFunc] ¬typical > isArrayLike¬

An array-like value has all the properties of an array yet is not an array instance. An example is the `arguments` object. Returns `true`` if the input value is an object, not `null`` and has a `length` property set with a numeric value.

Params
  Param | Type | Description
  ---   | ---  | ---
  input | *    | The input to test

Data
  exportType: Named

Example (js)
  function sum(x, y){
    console.log(t.isArrayLike(arguments))
    // prints `true`
  }

Code /*>>*/
export function isArrayLike (input) {
  return isObject(input) && typeof input.length === 'number'
}
/*<<*/

/*~
isObject (input) : boolean [boolFunc] ¬typical > isObject¬

Returns true if the typeof input is `'object'` but not null.

Params
  Param | Type | Description
  ---   | ---  | ---
  input | *    | The input to test

Data
  exportType: Named

Code /*>>*/
export function isObject (input) {
  return typeof input === 'object' && input !== null
}
/*<<*/

/*~
isDefined (input) : boolean [boolFunc] ¬typical > isDefined¬

Returns true if the input value is defined.

Params
  Param | Type | Description
  ---   | ---  | ---
  input | *    | The input to test

Data
  exportType: Named

Code /*>>*/
export function isDefined (input) {
  return typeof input !== 'undefined'
}
/*<<*/

/*~
isUndefined (input) : boolean [boolFunc] ¬typical > isUndefined¬

Returns true if the input value is undefined.

Params
  Param | Type | Description
  ---   | ---  | ---
  input | *    | The input to test

Data
  exportType: Named

Code /*>>*/
export function isUndefined (input) {
  return !isDefined(input)
}
/*<<*/

/*~
isNull (input) : boolean [boolFunc][P1] ¬typical > isNull¬

Returns true if the input value is null.

Data
  exportType: Named

Code /*>>*/
export function isNull (input) {
  return input === null
}
/*<<*/

/*~
isDefinedValue (input) : boolean [boolFunc][P1] ¬typical > isDefinedValue¬

Returns true if the input value is not one of `undefined`, `null`, or `NaN`.

Data
  exportType: Named

Code /*>>*/
export function isDefinedValue (input) {
  return isDefined(input) && !isNull(input) && !Number.isNaN(input)
}
/*<<*/

/*~
isClass (input) : boolean [boolFunc][P1] ¬typical > isClass¬

Returns true if the input value is an ES2015 `class`.

Data
  exportType: Named

Code /*>>*/
export function isClass (input) {
  if (typeof input === 'function') {
    return /^class /.test(Function.prototype.toString.call(input))
  } else {
    return false
  }
}
/*<<*/

/*~
isPrimitive (input) : boolean [boolFunc] ¬typical > isPrimitive¬

Returns true if the input is a string, number, symbol, boolean, null or undefined value.

Params
  Param | Type | Description
  ---   | ---  | ---
  input | *    | The input to test

Data
  exportType: Named

Code /*>>*/
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
/*<<*/

/*
 * Returns true if the input is a Promise.
 * @param {*} input - The input to test
 * @returns {boolean}
 * @static
*/

/*~
isPromise (input) : boolean [boolFunc][P1] ¬typical > isPromise¬

Returns true if the input is a Promise.

Data
  exportType: Named

Code /*>>*/
export function isPromise (input) {
  if (input) {
    const isPromise = isDefined(Promise) && input instanceof Promise
    const isThenable = input.then && typeof input.then === 'function'
    return !!(isPromise || isThenable)
  } else {
    return false
  }
}
/*<<*/

/*~
isIterable (input) : boolean [boolFunc][P1] ¬typical > isIterable¬

Returns true if the input is an iterable (`Map`, `Set`, `Array`, Generator etc.).

Data
  exportType: Named

Code /*>>*/
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
/*<<*/

/*~
isString (input) : boolean [boolFunc][P1] ¬typical > isString¬

Returns true if the input value is a string. The equivalent of `typeof input === 'string'` for use in funcitonal contexts.

Data
  exportType: Named

Code /*>>*/
export function isString (input) {
  return typeof input === 'string'
}
/*<<*/

/*~
isFunction (input) : boolean [boolFunc][P1] ¬typical > isFunction¬

Returns true if the input value is a function. The equivalent of `typeof input === 'function'` for use in funcitonal contexts.

Data
  exportType: Named

Code /*>>*/
export function isFunction (input) {
  return typeof input === 'function'
}
/*<<*/

/*~
isAsyncFunction (input) : boolean [boolFunc][P1] ¬typical > isAsyncFunction¬

Returns true if the input value is an async function or method.

Data
  exportType: Named

Code /*>>*/
export function isAsyncFunction (input) {
  return (typeof input === 'function' && input.constructor.name === 'AsyncFunction')
}
/*<<*/

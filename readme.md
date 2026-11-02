<a id="api-typical"></a>

# typical

- [typical](#api-typical) 
  - [isNumber (n) : boolean](#api-isNumber) <sup><mark>Named Export</mark></sup>
  - [isFiniteNumber (n) : boolean](#api-isFiniteNumber) <sup><mark>Named Export</mark></sup>
  - [isPlainObject (input) : boolean](#api-isPlainObject) <sup><mark>Named Export</mark></sup>
  - [isArrayLike (input) : boolean](#api-isArrayLike) <sup><mark>Named Export</mark></sup>
  - [isObject (input) : boolean](#api-isObject) <sup><mark>Named Export</mark></sup>
  - [isDefined (input) : boolean](#api-isDefined) <sup><mark>Named Export</mark></sup>
  - [isUndefined (input) : boolean](#api-isUndefined) <sup><mark>Named Export</mark></sup>
  - [isNull (input) : boolean](#api-isNull) <sup><mark>Named Export</mark></sup>
  - [isDefinedValue (input) : boolean](#api-isDefinedValue) <sup><mark>Named Export</mark></sup>
  - [isClass (input) : boolean](#api-isClass) <sup><mark>Named Export</mark></sup>
  - [isPrimitive (input) : boolean](#api-isPrimitive) <sup><mark>Named Export</mark></sup>
  - [isPromise (input) : boolean](#api-isPromise) <sup><mark>Named Export</mark></sup>
  - [isIterable (input) : boolean](#api-isIterable) <sup><mark>Named Export</mark></sup>
  - [isString (input) : boolean](#api-isString) <sup><mark>Named Export</mark></sup>
  - [isFunction (input) : boolean](#api-isFunction) <sup><mark>Named Export</mark></sup>
  - [isAsyncFunction (input) : boolean](#api-isAsyncFunction) <sup><mark>Named Export</mark></sup>

Isomorphic, functional type-checking for Javascript. Packaging each test as a function facilitates compact code where a callback is expected.

**Example**

```js
import { isDefined } from 'typical'
const allDefined = array.every(isDefined)
```

**Tests**

```js

```

<a id="api-isNumber"></a>

## isNumber (n) : boolean

Returns true if input is a number (including infinity). It is a more reasonable alternative to `typeof n` which returns `number` for `NaN`.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
n     | *    | The input to test

**Implementation**

```js
export function isNumber (n) {
  return !isNaN(Number.parseFloat(n))
}
```

**Tests**

```js
test.set('.isNumber(value)', function () {
  a.equal(t.isNumber(0), true)
  a.equal(t.isNumber(1), true)
  a.equal(t.isNumber(1.1), true)
  a.equal(t.isNumber(0xff), true)
  a.equal(t.isNumber(6.2e5), true)
  a.equal(t.isNumber(Infinity), true)
  a.equal(t.isNumber(NaN), false)
  a.equal(t.isNumber(null), false)
  a.equal(t.isNumber(undefined), false)
})
```
<a id="api-isFiniteNumber"></a>

## isFiniteNumber (n) : boolean

Returns true if input is a finite number. Identical to `isNumber` beside excluding infinity.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
n     | *    | The input to test

**Implementation**

```js
export function isFiniteNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
```

**Tests**

```js
test.set('.isFiniteNumber(value)', function () {
  a.equal(t.isFiniteNumber(0), true)
  a.equal(t.isFiniteNumber(1), true)
  a.equal(t.isFiniteNumber(1.1), true)
  a.equal(t.isFiniteNumber(0xff), true)
  a.equal(t.isFiniteNumber(6.2e5), true)
  a.equal(t.isFiniteNumber(NaN), false)
  a.equal(t.isFiniteNumber(Infinity), false)
  a.equal(t.isFiniteNumber(null), false)
  a.equal(t.isFiniteNumber(undefined), false)
})
```
<a id="api-isPlainObject"></a>

## isPlainObject (input) : boolean

A plain object is a simple object literal that is not an instance of a class. Returns `true` if the input `typeof` is `object` and is not `null` plus either has a _direct_ prototype of `Object.prototype` or `null`.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
Input | *    | The input to test

**Implementation**

```js
export function isPlainObject (input) {
  if (typeof input !== 'object' || input === null) {
    return false
  } else {
    const proto = Object.getPrototypeOf(input)
    return proto === null || proto === Object.prototype
  }
}
```

**Tests**

```js
test.set('.isPlainObject(value)', function () {
  a.equal(t.isPlainObject({ prop: 'val' }), true)
  a.equal(t.isPlainObject(new Date()), false)
  a.equal(t.isPlainObject([0, 1]), false)
  a.equal(t.isPlainObject(/test/), false)
  a.equal(t.isPlainObject(1), false)
  a.equal(t.isPlainObject('one'), false)
  a.equal(t.isPlainObject(null), false)
  a.equal(t.isPlainObject((function * () {})()), false)
  a.equal(t.isPlainObject(function * () {}), false)
  a.equal(t.isPlainObject(Object.create(null)), true) // Null-prototype object
  a.equal(t.isPlainObject({ constructor: 'something' }), true) // Object with own constructor property
})
```
<a id="api-isArrayLike"></a>

## isArrayLike (input) : boolean

An array-like value has all the properties of an array yet is not an array instance. An example is the `arguments` object. Returns `true`` if the input value is an object, not `null`` and has a `length` property set with a numeric value.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
input | *    | The input to test

**Example**

```js
function sum(x, y){
  console.log(t.isArrayLike(arguments))
  // prints `true`
}
```

**Implementation**

```js
export function isArrayLike (input) {
  return isObject(input) && typeof input.length === 'number'
}
```

**Tests**

```js
test.set('.isArrayLike', function () {
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
```
<a id="api-isObject"></a>

## isObject (input) : boolean

Returns true if the typeof input is `'object'` but not null.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
input | *    | The input to test

**Implementation**

```js
export function isObject (input) {
  return typeof input === 'object' && input !== null
}
```

**Tests**

```js
test.set('.isObject', function () {
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
```
<a id="api-isDefined"></a>

## isDefined (input) : boolean

Returns true if the input value is defined.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
input | *    | The input to test

**Implementation**

```js
export function isDefined (input) {
  return typeof input !== 'undefined'
}
```

**Tests**

```js
test.set('.isDefined(value)', function () {
  a.equal(t.isDefined({}), true)
  a.equal(t.isDefined({}.one), false)
  a.equal(t.isDefined(0), true)
  a.equal(t.isDefined(null), true)
  a.equal(t.isDefined(undefined), false)
})
```
<a id="api-isUndefined"></a>

## isUndefined (input) : boolean

Returns true if the input value is undefined.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
input | *    | The input to test

**Implementation**

```js
export function isUndefined (input) {
  return !isDefined(input)
}
```

**Tests**

```js
test.set('.isUndefined(value)', function () {
  a.equal(t.isUndefined({}), false)
  a.equal(t.isUndefined({}.one), true)
  a.equal(t.isUndefined(0), false)
  a.equal(t.isUndefined(null), false)
  a.equal(t.isUndefined(undefined), true)
})
```
<a id="api-isNull"></a>

## isNull (input) : boolean

Returns true if the input value is null.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
input | *    | The input to test

**Implementation**

```js
export function isNull (input) {
  return input === null
}
```

**Tests**

```js
test.set('.isNull(value)', function () {
  a.equal(t.isNull({}), false)
  a.equal(t.isNull({}.one), false)
  a.equal(t.isNull(0), false)
  a.equal(t.isNull(null), true)
  a.equal(t.isNull(undefined), false)
})
```
<a id="api-isDefinedValue"></a>

## isDefinedValue (input) : boolean

Returns true if the input value is not one of `undefined`, `null`, or `NaN`.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
input | *    | The input to test

**Implementation**

```js
export function isDefinedValue (input) {
  return isDefined(input) && !isNull(input) && !Number.isNaN(input)
}
```

**Tests**

```js
test.set('.isDefinedValue(value)', function () {
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
```
<a id="api-isClass"></a>

## isClass (input) : boolean

Returns true if the input value is an ES2015 `class`.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
input | *    | The input to test

**Implementation**

```js
export function isClass (input) {
  if (typeof input === 'function') {
    return /^class /.test(Function.prototype.toString.call(input))
  } else {
    return false
  }
}
```

**Tests**

```js
test.set('.isClass(value)', function () {
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
```
<a id="api-isPrimitive"></a>

## isPrimitive (input) : boolean

Returns true if the input is a string, number, symbol, boolean, null or undefined value.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
input | *    | The input to test

**Implementation**

```js
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
```

**Tests**

```js
test.set('.isPrimitive(value)', function () {
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

test.set('.isPrimitive(value) ES6', function () {
  a.equal(t.isPrimitive(Symbol()), true)
})
```
<a id="api-isPromise"></a>

## isPromise (input) : boolean

Returns true if the input is a Promise.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
input | *    | The input to test

**Implementation**

```js
export function isPromise (input) {
  if (input) {
    const isPromise = isDefined(Promise) && input instanceof Promise
    const isThenable = input.then && typeof input.then === 'function'
    return !!(isPromise || isThenable)
  } else {
    return false
  }
}
```

**Tests**

```js
test.set('.isPromise', function () {
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
```
<a id="api-isIterable"></a>

## isIterable (input) : boolean

Returns true if the input is an iterable (`Map`, `Set`, `Array`, Generator etc.).

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
input | *    | The input to test

**Implementation**

```js
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
```

**Tests**

```js
test.set('.isIterable', function () {
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

test.set('.isIterable [v10]', function () {
  a.equal(t.isIterable((async function * () {})()), true)
})
```
<a id="api-isString"></a>

## isString (input) : boolean

Returns true if the input value is a string. The equivalent of `typeof input === 'string'` for use in funcitonal contexts.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
input | *    | The input to test

**Implementation**

```js
export function isString (input) {
  return typeof input === 'string'
}
```

**Tests**

```js
test.set('.isString', function () {
  a.equal(t.isString('1'), true)
  a.equal(t.isString(1), false)
})
```
<a id="api-isFunction"></a>

## isFunction (input) : boolean

Returns true if the input value is a function. The equivalent of `typeof input === 'function'` for use in funcitonal contexts.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
input | *    | The input to test

**Implementation**

```js
export function isFunction (input) {
  return typeof input === 'function'
}
```

**Tests**

```js
test.set('.isFunction', function () {
  a.equal(t.isFunction(function () {}), true)
  a.equal(t.isFunction(new Function()), true)
  a.equal(t.isFunction(() => {}), true)
})
```
<a id="api-isAsyncFunction"></a>

## isAsyncFunction (input) : boolean

Returns true if the input value is an async function or method.

**Type**: Function  
**Returns**: `boolean`

**Params**

Param | Type | Description
---   | ---  | ---
input | *    | The input to test

**Implementation**

```js
export function isAsyncFunction (input) {
  return (typeof input === 'function' && input.constructor.name === 'AsyncFunction')
}
```

**Tests**

```js
test.set('.isAsyncFunction', function () {
  a.equal(t.isAsyncFunction(function () {}), false)
  a.equal(t.isAsyncFunction(new Function()), false)
  a.equal(t.isAsyncFunction(() => {}), false)
  a.equal(t.isAsyncFunction(async function () {}), true)
  const AsyncFunction = async function () {}.constructor
  a.equal(t.isAsyncFunction(new AsyncFunction()), true)
  a.equal(t.isAsyncFunction(async () => {}), true)
})
```

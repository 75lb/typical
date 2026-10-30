<a id="api-typical"></a>

# typical

- [typical](#api-typical) 
  - [isNumber (n) : boolean](#api-isNumber) <sup><mark>Named Export</mark></sup>
  - [isFiniteNumber (n) : boolean](#api-isFiniteNumber) <sup><mark>Named Export</mark></sup>
  - [isPlainObject (input) : boolean](#api-isPlainObject) <sup><mark>Named Export</mark></sup>

Isomorphic, functional type-checking for Javascript. Packaging each test as a function facilitates compact code where a callback is expected.

**Example**

```js
import { isDefined } from 'typical'
const allDefined = array.every(isDefined)
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
  a.equal(t.isNumber(NaN), false)
  a.equal(t.isNumber(Infinity), true)
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

<a id="api-typical"></a>

# typical

- [typical](#api-typical) 
  - [isNumber (n) : boolean](#api-isNumber) <sup><mark>Named Export</mark></sup>
    - [==parent: isNumber, id: testIsNumber==](#api-testIsNumber) 
  - [isFiniteNumber (n) : boolean](#api-isFiniteNumber) <sup><mark>Named Export</mark></sup>
    - [tests for isFiniteNumber](#api-isFiniteNumberTests) 
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

**Example**

```js
> t.isNumber(0)
true
> t.isNumber(1)
true
> t.isNumber(1.1)
true
> t.isNumber(0xff)
true
> t.isNumber(0644)
true
> t.isNumber(6.2e5)
true
> t.isNumber(NaN)
false
> t.isNumber(Infinity)
true
```

<a id="api-testIsNumber"></a>

### ==parent: isNumber, id: testIsNumber==

test.set('.isNumber(value)', function () {
  a.equal(t.isNumber(0), true)
  a.equal(t.isNumber(1), true)
  a.equal(t.isNumber(1.1), true)
  a.equal(t.isNumber(0xff), true)
  a.equal(t.isNumber(6.2e5), true)
  a.equal(t.isNumber(NaN), false)
  a.equal(t.isNumber(Infinity), true)
})

**Implementation**

```js
export function isNumber (n) {
  return !isNaN(Number.parseFloat(n))
}
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

**Example**

```js
> t.isFiniteNumber(0)
true
> t.isFiniteNumber(1)
true
> t.isFiniteNumber(1.1)
true
> t.isFiniteNumber(0xff)
true
> t.isFiniteNumber(0644)
true
> t.isFiniteNumber(6.2e5)
true
> t.isFiniteNumber(NaN)
false
> t.isFiniteNumber(Infinity)
false
```

<a id="api-isFiniteNumberTests"></a>

### tests for isFiniteNumber

test.set('.isFiniteNumber(value)', function () {
  a.equal(t.isFiniteNumber(0), true)
  a.equal(t.isFiniteNumber(1), true)
  a.equal(t.isFiniteNumber(1.1), true)
  a.equal(t.isFiniteNumber(0xff), true)
  a.equal(t.isFiniteNumber(6.2e5), true)
  a.equal(t.isFiniteNumber(NaN), false)
  a.equal(t.isFiniteNumber(Infinity), false)
})

**Implementation**

```js
export function isFiniteNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
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

**Example**

```js
> t.isPlainObject({ something: 'one' }) // object literal
true
> t.isPlainObject(Object.create(null)) // null-prototype plain object
true
> t.isPlainObject(new Date())
false
> t.isPlainObject([ 0, 1 ])
false
> t.isPlainObject(/test/)
false
> t.isPlainObject(1)
false
> t.isPlainObject('one')
false
> t.isPlainObject(null)
false
> t.isPlainObject((function * () {})())
false
> t.isPlainObject(function * () {})
false
```

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

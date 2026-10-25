<a id="api-typical"></a>

- [typical](#api-typical) 
  - [isNumber](#api-isNumber) 
  - [isFiniteNumber (n)](#api-isFiniteNumber)

# typical

Isomorphic, functional type-checking for Javascript.



**Example**

```js
import t from 'typical'
const allDefined = array.every(t.isDefined)
```

<a id="api-isNumber"></a>

## isNumber

Returns true if input is a number (including infinity). It is a more reasonable alternative to `typeof n` which returns `number` for `NaN`.

typical > isNumber () => {string}

**Returns**: `boolean`

**Params**

n | * | The input to test

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

**Implementation**

```js
export function isNumber (n) {
  return !isNaN(Number.parseFloat(n))
}
```
<a id="api-isFiniteNumber"></a>

## isFiniteNumber (n)

Returns true if input is a finite number. Identical to `isNumber` beside excluding infinity.

**Returns**: `boolean`

**Params**

n | * | The input to test

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

**Implementation**

```js
export function isFiniteNumber (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
/*<
```

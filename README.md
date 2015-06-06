[![view on npm](http://img.shields.io/npm/v/typical.svg)](https://www.npmjs.org/package/typical)
[![npm module downloads per month](http://img.shields.io/npm/dm/typical.svg)](https://www.npmjs.org/package/typical)
[![Build Status](https://travis-ci.org/75lb/typical.svg?branch=master)](https://travis-ci.org/75lb/typical)
[![Dependency Status](https://david-dm.org/75lb/typical.svg)](https://david-dm.org/75lb/typical)

<a name="module_typical"></a>
## typical
For type-checking Javascript values.

**Example**  
```js
var t = require("typical");
```

* [typical](#module_typical)
  * [.isNumber(n)](#module_typical.isNumber) ⇒ <code>boolean</code>
  * [.isPlainObject(input)](#module_typical.isPlainObject) ⇒ <code>boolean</code>
  * [.isArrayLike(input)](#module_typical.isArrayLike) ⇒ <code>boolean</code>

<a name="module_typical.isNumber"></a>
### t.isNumber(n) ⇒ <code>boolean</code>
Returns true if input is a number

**Kind**: static method of <code>[typical](#module_typical)</code>  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>\*</code> | the input to test |

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
false
```
<a name="module_typical.isPlainObject"></a>
### t.isPlainObject(input) ⇒ <code>boolean</code>
A plain object is a simple object literal, it is not an instance of a class. Returns true if the input `typeof` is `object` and directly decends from `Object`.

**Kind**: static method of <code>[typical](#module_typical)</code>  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>\*</code> | the input to test |

**Example**  
```js
> t.isPlainObject({ clive: "hater" })
true
> t.isPlainObject(new Date())
false
> t.isPlainObject([ 0, 1 ])
false
> t.isPlainObject(1)
false
> t.isPlainObject(/test/)
false
```
<a name="module_typical.isArrayLike"></a>
### t.isArrayLike(input) ⇒ <code>boolean</code>
An array-like value has all the properties of an array, but is not an array instance. Examples in the `arguments` object. Returns true if the input value is an object, not null and has a `length` property with a numeric value.

**Kind**: static method of <code>[typical](#module_typical)</code>  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>\*</code> | the input to test |

**Example**  
```js
function sum(x, y){
    console.log(t.isArrayLike(arguments));
    // prints `true`
}
```

* * *

&copy; 2015 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).

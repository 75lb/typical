"use strict";

/**
For type-checking Javascript values.
@module
@alias t
@example
```js
var t = require("typical");
```
*/

exports.isNumber = isNumber;
exports.isPlainObject = isPlainObject;

/**
Returns true if input is a number
@param {*} - the input to test
@returns {boolean}
@example
```js
> w.isNumber(0)
true
> w.isNumber(1)
true
> w.isNumber(1.1)
true
> w.isNumber(0xff)
true
> w.isNumber(0644)
true
> w.isNumber(6.2e5)
true
> w.isNumber(NaN)
false
> w.isNumber(Infinity)
false
```
*/
function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
Returns true if input type is `object` and not an Array
@param {*} - the input to test
@returns {boolean}
@example
```js
> w.isPlainObject(new Date())
true
> w.isPlainObject({ clive: "hater" })
true
> w.isPlainObject([ 0, 1 ])
false
```
*/
function isPlainObject(input){
    return typeof input === "object" && !Array.isArray(input);
}
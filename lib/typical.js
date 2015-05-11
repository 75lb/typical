"use strict";

/**
For type-checking Javascript values.
@module typical
@typicalname t
@example
var t = require("typical");
*/
exports.isNumber = isNumber;
exports.isPlainObject = isPlainObject;

/**
Returns true if input is a number
@param {*} - the input to test
@returns {boolean}
@static
@example
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
*/
function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
Returns true if input `typeof` is `object` and directly decends from `Object` (and not `Array`, `RegExp` etc.)
@param {*} - the input to test
@returns {boolean}
@static
@example
> t.isPlainObject(new Date())
true
> t.isPlainObject({ clive: "hater" })
true
> t.isPlainObject([ 0, 1 ])
false
> t.isPlainObject(1)
false
> t.isPlainObject(/test/)
false
*/
function isPlainObject(input){
    return typeof input === "object" && input.constructor === Object;
}

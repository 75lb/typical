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
exports.isArrayLike = isArrayLike;
exports.isObject = isObject;

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
*/
function isPlainObject(input){
    return input !== null && typeof input === "object" && input.constructor === Object;
}

/**
returns true if this object can be treated like an Array. 
@param {*} - the input to test
@returns {boolean}
@static
*/
function isArrayLike(input){
	return isObject(input) && typeof input.length === "number";
}

/**
returns true if the typeof input is `"object"`, but not null! 
@param {*} - the input to test
@returns {boolean}
@static
*/
function isObject(input){
    return typeof input ==="object" && input !== null;
}

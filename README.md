[![view on npm](http://img.shields.io/npm/v/typical.svg)](https://www.npmjs.org/package/typical)
[![npm module downloads per month](http://img.shields.io/npm/dm/typical.svg)](https://www.npmjs.org/package/typical)
[![Build Status](https://travis-ci.org/75lb/typical.svg?branch=master)](https://travis-ci.org/75lb/typical)
[![Dependency Status](https://david-dm.org/75lb/typical.svg)](https://david-dm.org/75lb/typical)


#typical
For type-checking Javascript values.

####Example
```js
var t = require("typical");
```



**Contents**
* [isNumber(n)](#module_typical.isNumber)
* [isPlainObject(input)](#module_typical.isPlainObject)







<a name="module_typical.isNumber"></a>
###isNumber(n)
Returns true if input is a number


- n `*` the input to test  


**Returns**: `boolean`

####Example
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



<a name="module_typical.isPlainObject"></a>
###isPlainObject(input)
Returns true if input type is `object` and not an Array


- input `*` the input to test  


**Returns**: `boolean`

####Example
```js
> w.isPlainObject(new Date())
true
> w.isPlainObject({ clive: "hater" })
true
> w.isPlainObject([ 0, 1 ])
false
```











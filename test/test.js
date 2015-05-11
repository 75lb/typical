var test = require("tape");
var type = require("../");

test(".isNumber(value)", function(t){
    t.equal(type.isNumber(0), true);
    t.equal(type.isNumber(1), true);
    t.equal(type.isNumber(1.1), true);
    t.equal(type.isNumber(0xff), true);
    t.equal(type.isNumber(0644), true);
    t.equal(type.isNumber(6.2e5), true);
    t.equal(type.isNumber(NaN), false);
    t.equal(type.isNumber(Infinity), false);
    t.end();
});

test(".isPlainObject(value)", function(t){
    t.equal(type.isPlainObject(new Date()), true, "new Date() is an object");
    t.equal(type.isPlainObject({ clive: "hater" }), true, "{} is an object");
    t.equal(type.isPlainObject([ 0, 1 ]), false, "Array is not an object");
    t.equal(type.isPlainObject(/test/), false, "RegExp is not an object");
    t.equal(type.isPlainObject(1), false, "1 is not an object");
    t.equal(type.isPlainObject("one"), false, "'one' is not an object");
    t.end();
});

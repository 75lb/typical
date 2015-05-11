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
    t.equal(type.isPlainObject({ clive: "hater" }), true, "{} is true");
    t.equal(type.isPlainObject(new Date()), false, "new Date() is false");
    t.equal(type.isPlainObject([ 0, 1 ]), false, "Array is false");
    t.equal(type.isPlainObject(/test/), false, "RegExp is false");
    t.equal(type.isPlainObject(1), false, "1 is false");
    t.equal(type.isPlainObject("one"), false, "'one' is false");
    t.equal(type.isPlainObject(null), false, "null is false");
    t.end();
});

var test = require("tape");
var type = require("../");

test("first", function(t){
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

test("first", function(t){
    t.equal(type.isPlainObject(new Date()), true);
    t.equal(type.isPlainObject({ clive: "hater" }), true);
    t.equal(type.isPlainObject([ 0, 1 ]), false);
    t.end();
});

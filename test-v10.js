const Tom = require('test-runner').Tom
const t = require('./')
const a = require('assert')

const tom = module.exports = new Tom('typical-v10')

tom.test('.isIterable [v10]', function () {
  a.strictEqual(t.isIterable((async function * () {})()), true)
})

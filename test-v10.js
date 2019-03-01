const TestRunner = require('test-runner')
const t = require('./')
const runner = new TestRunner()
const a = require('assert')

runner.test('.isIterable [v10]', function () {
  a.strictEqual(t.isIterable((async function * () {})()), true)
})

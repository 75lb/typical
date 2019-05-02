import Tom from '../node_modules/test-object-model/dist/index.mjs'
import * as t from '../index.mjs'
const tom = new Tom('typical-v10')
let a

async function start () {
  /* isomorphic: load assertion library */
  if (typeof window === 'undefined') {
    a = await import('assert')
  } else {
    await import('https://www.chaijs.com/chai.js')
    a = window.chai.assert
    window.tom = tom
  }

  tom.test('.isIterable [v10]', function () {
    a.strictEqual(t.isIterable((async function * () {})()), true)
  })
}

start().catch(console.error)
export default tom

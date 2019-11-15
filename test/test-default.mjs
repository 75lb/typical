import Tom from 'test-object-model'
import t from '../index.mjs'
const tom = new Tom('import-default')
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

  tom.test('isClass exported', function () {
    a.ok(t.isClass)
  })
}

start().catch(console.error)
export default tom

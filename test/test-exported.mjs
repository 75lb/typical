import Tom from '../node_modules/test-object-model/dist/index.mjs'
import { isClass } from '../index.mjs'
const tom = new Tom('import-exported')
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
    a.ok(isClass)
  })
}

start().catch(console.error)
export default tom

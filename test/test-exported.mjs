import Tom from 'test-object-model'
import { isClass } from '../index.mjs'
import getAssert from 'isomorphic-assert'

async function getTom () {
  const tom = new Tom()
  const a = await getAssert()

  tom.test('isClass exported', function () {
    a.ok(isClass)
  })

  return tom
}

export default getTom()

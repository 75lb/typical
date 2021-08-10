import Tom from 'test-object-model'
import getAssert from 'isomorphic-assert'
import { isClass } from '../index.js'

async function getTom () {
  const tom = new Tom()
  const a = await getAssert()

  tom.test('isClass exported', function () {
    a.ok(isClass)
  })

  return tom
}

export default getTom()

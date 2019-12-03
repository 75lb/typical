import Tom from 'test-object-model'
import t from '../index.mjs'
import getAssert from 'isomorphic-assert'

async function getTom () {
  const tom = new Tom()
  const a = await getAssert()

  tom.test('isClass exported', function () {
    a.ok(t.isClass)
  })

  return tom
}

export default getTom()

import { isClass } from 'typical'
import { strict as a } from 'assert'

const [test, only, skip] = [new Map(), new Map(), new Map()]

test.set('isClass exported', function () {
  a.ok(isClass)
})

export { test, only, skip }

const quickMatch = new Map()

quickMatch.set(/\[boolFunc\]/, function boolFunc (block, matches) {
  block.data ||= {}
  block.data.codeType = 'Function'
  block.data.returns = 'boolean'
})

quickMatch.set(/Path\s+(\w+) > (\w+)/, function pathFunc (block, matches) {
  block.data ||= {}
  block.data.id = matches[2]
  block.data.parent = matches[1]
})

quickMatch.set(/¬\s*([\w> ]+)\s*¬/, function breadcrumb (block, matches) {
  const ids = matches[1].split(' > ')
  if (ids.length === 1) {
    block.data ||= {}
    block.data.id = ids[0].trim()
  } else if (ids.length === 2) {
    block.data ||= {}
    block.data.parent = ids[0].trim()
    block.data.id = ids[1].trim()
  } else {
    throw new Error('Invalid breadcrumb: ' + matches[1])
  }
})

quickMatch.set(/\[P1\]/, function params1 (block, matches) {
  block.params = `Param | Type | Description
---   | ---  | ---
input | *    | The input to test`
})

export default quickMatch

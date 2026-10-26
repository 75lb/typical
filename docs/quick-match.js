const map = new Map()

map.add(/[boolFunc]/, function boolFunc (block, matches) {
  block.data.codeType = 'Function'
  block.data.returns = 'boolean'
})

map.add(/Path\s+(\w+) > (\w+)/, function boolFunc (block, matches) {
  block.data.id = 'id'
  block.data.parent = 'parent'
})

export default map

export const omit = (obj: unknown, key: string): unknown => {
  return Object.entries(obj)
    .filter(item => item[0] !== key)
    .reduce((acc, item) => Object.assign({}, acc, { [item[0]]: item[1] }), {})
}

export const flatten = (tree: Array<any>, key = 'children'): Array<any> => {
  return tree.reduce((acc, item) => (
    !item[key] ? acc.concat(item) : acc.concat(item, flatten(item[key], key))
  ), [])
}

import { TreeData, TreeItem } from './tree-types'

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

/**
 * 用于设置 Tree Node 的 ID 属性
 * 应用场景: 懒加载 loading 后元素定位
 */
const precheckNodeId = (d: TreeItem): TreeItem => {
  const random = parseInt((Math.random() * (10 ** 8)).toString().padEnd(8, '0'))
  return { ...d, id: d.id ? `${d.id}_${random}` : `${d.label.replaceAll(' ', '-')}_${random}` }
}

/**
 * 用于 Tree Node 的数据格式检查
 */
export const precheckTree = (ds: TreeData): TreeData => {
  return ds.map(d => {
    const dd = precheckNodeId(d)
    if (d.children) {
      return {
        ...dd,
        children: precheckTree(d.children)
      }
    }
    return dd
  })
}

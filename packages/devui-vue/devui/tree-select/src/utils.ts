import { TreeData } from '../src/tree-select-types'

export function attributeExtension(data: TreeData): any {
  data.forEach((el) => {
    let level = 1
    el.level = level
    const nodeQueue = []
    nodeQueue.push(el)
    while(nodeQueue.length !== 0) {
      const node = nodeQueue.shift()
      if(node.children) {
        node.children.forEach((el) => {
          el.level = level + 1
          el.parent = node
          nodeQueue.push(el)
        })
      }
      level += 1
    }
  })
  return data
}

/**
 * 动态获取class字符串
 * @param classStr 是一个字符串，固定的class名
 * @param classOpt 是一个对象，key表示class名，value为布尔值，true则添加，否则不添加
 * @returns 最终的class字符串
 */
export function className(
  classStr: string,
  classOpt?: { [key: string]: boolean; }
): string {
  let classname = classStr;
  if (typeof classOpt === 'object') {
    Object.keys(classOpt).forEach((key) => {
      classOpt[key] && (classname += ` ${key}`);
    });
  }

  return classname;
}

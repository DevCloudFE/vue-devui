import { TreeData, TreeItem } from './deprecated-tree-types';


export const omit = (obj: Record<string, unknown>, key: string): Record<string, unknown> => {
  return Object.entries(obj)
    .filter(item => item[0] !== key)
    .reduce((acc, item) => Object.assign({}, acc, { [item[0]]: item[1] }), {});
};

export const flatten = (tree: TreeItem[], key = 'children'): TreeItem[] => {
  return tree.reduce((acc: TreeItem[], item) => (
    !item[key] ? acc.concat(item) : acc.concat(item, flatten(item[key], key))
  ), []);
};

/**
 * 用于设置 Tree Node 的 ID 属性
 * 应用场景: 懒加载 loading 后元素定位
 */
const getRandomId = (): string => (Math.random() * 10 ** 9).toString().slice(0,8);
const preCheckNodeId = (d: TreeItem, postfixId?: string): TreeItem => {
  const randomStr = getRandomId();
  return { ...d, id: postfixId ? `${postfixId}_${randomStr}` : randomStr };
};
export const getId = (id: string): string => {
  const ids = id.split('_');
  return [...ids.slice(0, ids.length), getRandomId()].join('_');
};

/**
 * 用于 Tree Node 的数据格式检查
 */
export const preCheckTree = (ds: TreeData, postfixId?: string): TreeData => {
  return ds.map(d => {
    const dd = preCheckNodeId(d, postfixId);
    if (!dd.parentId && postfixId) {
      dd.parentId = postfixId;
    }
    return d.children ? {
      ...dd,
      children: preCheckTree(d.children, dd.id)
    } : dd;
  });
};

const _deleteNode = (ids: Array<string>, data: Array<TreeItem>, index = 0): Array<TreeItem> => {
  const curTargetId = ids.slice(0, index + 2).join('_');
  data.forEach(item => {
    if (item.id === ids.slice(0, index + 1).join('_')) {
      if (ids.length === index + 2) {
        item.children = item.children.filter(({ id: d }) => d !== curTargetId);
      } else {
        item.children = _deleteNode(ids, item.children, index + 1);
      }
    }
  });
  return data;
};
export const deleteNode = (id: string, data: Array<TreeItem>): Array<TreeItem> => {
  if (id.includes('_')) {
    return _deleteNode(id.split('_'), data);
  }
  return data.filter(({ id: d }) => d !== id);
};

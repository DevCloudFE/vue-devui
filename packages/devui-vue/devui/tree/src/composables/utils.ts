import { randomId } from '../../../shared/utils';
import { IInnerTreeNode, ITreeNode } from './use-tree-types';

export function flatToNested(flatTree: IInnerTreeNode[]): ITreeNode[] {
  const treeMap = {};
  return flatTree.reduce((acc: ITreeNode[], cur: IInnerTreeNode) => {
    const { id, parentId } = cur;

    if (!treeMap[id]) {
      treeMap[id] = {
        ...cur,
        children: [],
      };
    }

    if (!treeMap[parentId]) {
      acc.push(treeMap[id]);
    } else {
      treeMap[parentId].children.push(treeMap[id]);
    }

    return acc;
  }, []);
}

export function omit<T>(obj: T, ...keys: Array<keyof T>): { [key: string]: unknown } {
  return Object.entries(obj)
    .filter((item) => !keys.includes(item[0]))
    .reduce((acc, item) => Object.assign({}, acc, { [item[0]]: item[1] }), {});
}

/**
 * 用于生成内部使用的扁平结构，对树的所有操作都是在操作这个内部的扁平结构，
 * 该数据一旦发生变化，树组件的 UI 即相应变化。
 *
 * @param tree 原始嵌套结构的树数据
 * @param key 子节点key，默认为'children'
 * @returns 扁平结构的树数据
 *
 * 将嵌套结构拍平之后，增加了
 * - 'id'：唯一标识一个树节点
 * - 'parentId'：父节点
 * - 'level'：所属的节点层级
 * - 'isLeaf'：是否是叶子节点，用于决定是否渲染展开/收起按钮
 * - 'idType'(没有传入 id 的节点会生成一个随机的 id，idType 用来标识 id 是否是随机生成的)
 */
export function generateInnerTree(
  tree: ITreeNode[],
  key = 'children',
  level = 0,
  path: ITreeNode[] = []
): IInnerTreeNode[] {
  level++;

  return tree.reduce((acc: ITreeNode[], item: ITreeNode) => {
    const newItem = Object.assign({}, item);
    if (newItem.id === undefined) {
      newItem.id = randomId();
      newItem.idType = 'random';
    }

    newItem.level = level;

    if (path.length > 0 && path[path.length - 1]?.level >= level) {
      while (path[path.length - 1]?.level >= level) {
        path.pop();
      }
    }

    path.push(newItem);

    const parentNode = path[path.length - 2];
    if (parentNode) {
      newItem.parentId = parentNode.id;
    }

    if (!newItem[key]) {
      return acc.concat({ ...newItem, isLeaf: true });
    } else {
      return acc.concat(omit<ITreeNode>(newItem, 'children'), generateInnerTree(newItem[key], key, level, path));
    }
  }, []);
}

import { randomId } from '../../../anchor/src/util';
import { IInnerTreeNode, ITreeNode } from './tree-factory-types';

export function flatToNested(flatTree: IInnerTreeNode[]): ITreeNode[] {
  let treeMap = {};
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

export function generateInnerTree(
  tree: ITreeNode[],
  key = 'children',
  level: number = 0,
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

export function omit<T>(obj: T, ...keys: Array<keyof T>) {
  return Object.entries(obj)
    .filter((item) => !keys.includes(item[0]))
    .reduce((acc, item) => Object.assign({}, acc, { [item[0]]: item[1] }), {});
}

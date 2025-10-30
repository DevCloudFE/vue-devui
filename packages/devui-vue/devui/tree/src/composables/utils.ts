import { v4 as uuidv4 } from 'uuid';
import { omit } from '../../../shared/utils';
import { useInitSelectCollection } from './use-init-select-collection';
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

const toggleChildNodeVisible = (node: IInnerTreeNode, visible: boolean) => {
  if (!node.childList?.length) {
    return;
  }
  const nodeList = [...node.childList];
  while (nodeList.length) {
    const item = nodeList.shift();
    if (item) {
      item.showNode = visible;
      if ((visible && item.expanded) || (!visible && item.childNodeCount)) {
        const temp = item.childList || [];
        nodeList.push(...temp);
      }
    }
  }
};

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
 * - 'idType'：(没有传入 id 的节点会生成一个随机的 id，idType 用来标识 id 是否是随机生成的)
 * - 'parentChildNodeCount'：父级子节点数量
 * - 'currentIndex'：当前节点在父节点的索引
 */
const { setInitSelectedNode } = useInitSelectCollection();
export function generateInnerTree(tree: ITreeNode[], key = 'children', level = 0, parentNode: IInnerTreeNode = {}): IInnerTreeNode[] {
  level++;

  const result: IInnerTreeNode[] = [];

  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];
    const newItem: Partial<IInnerTreeNode> = Object.assign({}, item);
    if (newItem.id === undefined) {
      newItem.id = uuidv4();
      newItem.idType = 'random';
    }

    if (newItem.selected) {
      setInitSelectedNode(newItem);
    }

    newItem.level = level;
    newItem.parentChildNodeCount = tree.length;
    newItem.currentIndex = i;
    newItem.childNodeCount = newItem.children?.length || 0;
    newItem.isLeaf = newItem.isLeaf ?? !newItem.children?.length;
    newItem.showNode = level === 1;

    if (parentNode) {
      newItem.parentId = parentNode.id;
    }

    if (!newItem[key]) {
      result.push({ ...newItem, isLeaf: newItem.isLeaf === false ? false : true });
    } else {
      const children = generateInnerTree(newItem[key], key, level, newItem);
      const childList: IInnerTreeNode[] = [];
      for (let j = 0; j < children.length; j++) {
        const item = children[j];
        if (item.parentId === newItem.id) {
          childList.push(item);
        }
      }
      newItem.childList = childList;
      newItem.expanded && toggleChildNodeVisible(newItem, true);
      result.push(omit<ITreeNode>(newItem, 'children'), ...children);
    }
  }

  return result;
}

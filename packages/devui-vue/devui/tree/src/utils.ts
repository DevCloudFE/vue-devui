import type { ICheck, ICheckStrategy, ITreeNode, IInnerTreeNode } from './composables/use-tree-types';
import { randomId } from '../../shared/utils';

/**
 * true 默认为 both，false 默认为 none。
 * "true" defaults to "both" and "false" to "none".
 */
export const formatCheckStatus = (check: ICheck): ICheckStrategy => {
  return typeof check === 'boolean' ?
    check ? 'both' : 'none'
    : check;
};
/**
 * Standardized tree node
 * @param trees
 * @param keyName
 * @param childrenName
 * @param parentId
 * @returns IInnerTreeNode[]
 */
export const formatBasicTree = (trees: ITreeNode[], keyName = 'id', childrenName = 'children', parentId?: string): IInnerTreeNode[] => {
  return trees.map((item) => {
    const curItem = { ...item, parentId } as IInnerTreeNode;
    if (
      !(keyName in curItem)
      || !curItem[keyName as 'id']
    ) {
      curItem[keyName as 'id'] = randomId();
      curItem.idType = 'random';
    }
    if (
      childrenName in curItem
      && Array.isArray(curItem[childrenName as 'children'])
      && curItem[childrenName as 'children']?.length
    ) {
      // Child nodes exist
      curItem[childrenName as 'children'] = formatBasicTree(
        curItem[childrenName as 'children'] as ITreeNode[],
        keyName,
        childrenName,
        curItem[keyName as 'id'],
      );
      // Child nodes exist after node dragging
      if ('isLeaf' in curItem) {
        delete curItem.isLeaf;
      }
    } else {
      // There is no child node, and then there is no IsLeaf attribute
      if (!('isLeaf' in curItem)) {
        curItem.isLeaf = true;
      }
    }
    if (!curItem.parentId) {
      delete curItem.parentId;
    }
    return curItem;
  });
};

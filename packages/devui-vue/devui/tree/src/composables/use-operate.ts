import { Ref } from 'vue';
import { IInnerTreeNode, ITreeNode, IUseCore } from './use-tree-types';

export interface IUseOperate {
  insertBefore: (parentNode: ITreeNode, node: ITreeNode, referenceNode: ITreeNode,) => void;
  removeNode: (node: ITreeNode) => void;
  editNode: (node: IInnerTreeNode, label: string) => void;
}

export default function () {
  return function useOperate(data: Ref<IInnerTreeNode[]>, core: IUseCore): IUseOperate {

    const { setNodeValue, getChildren, getIndex, getLevel } = core;

    const insertBefore = (
      parentNode: ITreeNode,
      node: ITreeNode,
      referenceNode: ITreeNode,
    ): void => {
      const children = getChildren(parentNode);
      const lastChild = children[children.length - 1];
      let insertedIndex = getIndex(parentNode) + 1;

      if (referenceNode) {
        insertedIndex = getIndex(referenceNode);
      } else if (lastChild) {
        insertedIndex = getIndex(lastChild) + 1;
      }

      setNodeValue(parentNode, 'expanded', true);
      setNodeValue(parentNode, 'isLeaf', false);

      const currentNode = {
        ...node,
        level: getLevel(parentNode) + 1,
        parentId: parentNode.id,
        isLeaf: true,
      };

      data.value = data.value.slice(0, insertedIndex)
        .concat(
          currentNode,
          data.value.slice(insertedIndex, data.value.length)
        );
    };

    const removeNode = (node: IInnerTreeNode, config = { recursive: true }): void => {
      if (!config.recursive) {
        getChildren(node).forEach(child => {
          setNodeValue(child, 'level', getLevel(child) - 1);
        });
      }

      data.value = data.value.filter(item => {
        if (config.recursive) {
          return item.id !== node.id && !getChildren(node).map(nodeItem => nodeItem.id).includes(item.id);
        } else {
          return item.id !== node.id;
        }
      });
    };

    const editNode = (node: IInnerTreeNode, label: string): void => {
      setNodeValue(node, 'label', label);
    };

    return {
      insertBefore,
      removeNode,
      editNode,
    };
  };
}

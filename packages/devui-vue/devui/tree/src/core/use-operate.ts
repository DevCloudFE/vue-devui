import { Ref } from 'vue';
import { IInnerTreeNode, ITreeNode, IUseCore } from './use-tree-types';

export default function useOperate(data: Ref<IInnerTreeNode[]>, core: IUseCore) {
  console.log('useOperate:', data, data.value);

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
  }

  const removeNode = (node: ITreeNode): void => {
    data.value = data.value.filter(item => {
      return item.id !== node.id && !getChildren(node).map(nodeItem => nodeItem.id).includes(item.id);
    });
  }

  const editNode = (node: IInnerTreeNode, label: string): void => {
    setNodeValue(node, 'label', label);
  }

  return {
    insertBefore,
    removeNode,
    editNode,
  }
}
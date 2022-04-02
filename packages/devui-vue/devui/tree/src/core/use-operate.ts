import { Ref } from 'vue';
import { IInnerTreeNode, ITreeNode, IUseCore } from './use-tree-types';

export default function useOperate(data: Ref<IInnerTreeNode[]>, core: IUseCore) {
  console.log('useOperate:', data, data.value);

  const { setNodeValue, getChildren } = core;
  
  const insertBefore = (parentNode: ITreeNode, node: ITreeNode, referenceNode: ITreeNode, cut: boolean = false): void => {
    // TODO
  }

  const removeNode = (node: ITreeNode): void => {
    data.value = data.value.filter(item => {
      return item.id !== node.id && !getChildren(node).map(nodeItem => nodeItem.id).includes(item.id);
    })
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
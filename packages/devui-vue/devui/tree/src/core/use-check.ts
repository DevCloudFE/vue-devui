import { Ref } from 'vue';
import { IInnerTreeNode, IUseCore } from './tree-factory-types';

export default function useCheck(data: Ref<IInnerTreeNode[]>, core: IUseCore) {
  console.log('useCheck:', data, data.value);
  
  const { setNodeValue } = core;

  const checkNode = (node: IInnerTreeNode): void => {
    setNodeValue(node, 'checked', true);
  }

  const uncheckNode = (node: IInnerTreeNode): void => {
    setNodeValue(node, 'checked', false);
  }

  return {
    checkNode,
    uncheckNode,
  }
}
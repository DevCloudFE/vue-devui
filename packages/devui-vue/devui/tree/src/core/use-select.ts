import { Ref } from 'vue';
import { IInnerTreeNode, IUseCore } from './tree-factory-types';

export default function useSelect(data: Ref<IInnerTreeNode[]>, core: IUseCore) {
  console.log('useSelect:', data, data.value);
  
  const { setNodeValue } = core;

  const selectNode = (node: IInnerTreeNode): void => {
    setNodeValue(node, 'selected', true);
  }

  return {
    selectNode,
  }
}
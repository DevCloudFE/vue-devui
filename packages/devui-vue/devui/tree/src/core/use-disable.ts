import { Ref } from 'vue';
import { IInnerTreeNode, IUseCore } from './tree-factory-types';

export default function useDisable(data: Ref<IInnerTreeNode[]>, core: IUseCore) {
  console.log('useDisable:', data, data.value);

  const { setNodeValue } = core;
  
  const disableSelectNode = (node: IInnerTreeNode): void => {
    setNodeValue(node, 'disableSelect', true);
  }

  const disableCheckNode = (node: IInnerTreeNode): void => {
    setNodeValue(node, 'disableCheck', true);
  }

  const disableToggleNode = (node: IInnerTreeNode): void => {
    setNodeValue(node, 'disableToggle', true);
  }

  return {
    disableSelectNode,
    disableCheckNode,
    disableToggleNode,
  }
}
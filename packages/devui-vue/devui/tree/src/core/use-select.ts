import { ref, Ref } from 'vue';
import { IInnerTreeNode, IUseCore } from './tree-factory-types';

export default function useSelect(data: Ref<IInnerTreeNode[]>, core: IUseCore) {
  console.log('useSelect:', data, data.value);
  
  const { setNodeValue } = core;

  let prevActiveNode: IInnerTreeNode;

  const selectNode = (node: IInnerTreeNode): void => {
    if (node.disableSelect) { return; }
    if (node.id === prevActiveNode?.id) { return; }
    if (prevActiveNode) {
      const prevActiveNodeIndex = data.value.findIndex(item => item.id === prevActiveNode.id)
      setNodeValue(data.value[prevActiveNodeIndex], 'selected', false);
    }
    setNodeValue(node, 'selected', true);
    prevActiveNode = node;
  }

  return {
    selectNode,
  }
}
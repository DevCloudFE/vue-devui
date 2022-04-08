import { ref, Ref } from 'vue';
import { IInnerTreeNode, IUseCore } from './use-tree-types';

export default function(options?) {
  return function useSelect(data: Ref<IInnerTreeNode[]>, core: IUseCore) {
    const { setNodeValue } = core;

    let prevActiveNode: IInnerTreeNode;

    const selectNode = (node: IInnerTreeNode): void => {
      if (node.disableSelect) { return; }

      if (prevActiveNode) {
        const prevActiveNodeIndex = data.value.findIndex(item => item.id === prevActiveNode.id)
        setNodeValue(data.value[prevActiveNodeIndex], 'selected', false);
      }
      
      setNodeValue(node, 'selected', true);
      prevActiveNode = node;
    }

    const deselectNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'selected', false);
    }

    const toggleSelectNode = (node: IInnerTreeNode): void => {
      if (node.selected) {
        deselectNode(node);
      } else {
        selectNode(node);
      }
    }

    return {
      selectNode,
      deselectNode,
      toggleSelectNode,
    }
  };
}

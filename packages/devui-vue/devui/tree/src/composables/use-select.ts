import { Ref } from 'vue';
import { IInnerTreeNode, IUseCore } from './use-tree-types';

export interface IUseSelect {
  selectNode: (node: IInnerTreeNode) => void;
  deselectNode: (node: IInnerTreeNode) => void;
  toggleSelectNode: (node: IInnerTreeNode) => void;
}

export default function () {
  return function useSelect(data: Ref<IInnerTreeNode[]>, core: IUseCore): IUseSelect {
    const { setNodeValue } = core;

    let prevActiveNode: IInnerTreeNode;

    const selectNode = (node: IInnerTreeNode): void => {
      if (node.disableSelect) { return; }

      if (prevActiveNode) {
        const prevActiveNodeIndex = data.value.findIndex(item => item.id === prevActiveNode.id);
        setNodeValue(data.value[prevActiveNodeIndex], 'selected', false);
      }

      setNodeValue(node, 'selected', true);
      prevActiveNode = node;
    };

    const deselectNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'selected', false);
    };

    const toggleSelectNode = (node: IInnerTreeNode): void => {
      if (node.selected) {
        deselectNode(node);
      } else {
        selectNode(node);
      }
    };

    return {
      selectNode,
      deselectNode,
      toggleSelectNode,
    };
  };
}

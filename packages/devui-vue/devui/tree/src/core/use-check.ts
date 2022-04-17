import { Ref } from 'vue';
import { CheckStrategy, IInnerTreeNode, IUseCore } from './use-tree-types';

export default function(options?: {
  checkStrategy: CheckStrategy
}) {
  return function useCheck(data: Ref<IInnerTreeNode[]>, core: IUseCore) {
    const { setNodeValue, getNode } = core;

    const checkNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'checked', true);
    }

    const uncheckNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'checked', false);
    }

    const toggleCheckNode = (node: IInnerTreeNode): void => {
      if (getNode(node).checked) {
        setNodeValue(node, 'checked', false);
      } else {
        setNodeValue(node, 'checked', true);
      }
    }

    return {
      checkNode,
      uncheckNode,
      toggleCheckNode,
    }
  };
}

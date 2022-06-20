import { Ref, SetupContext } from 'vue';
import { IInnerTreeNode, IUseCore } from './use-tree-types';

export interface IUseToggle {
  expandNode: (node: IInnerTreeNode) => void;
  collapseNode: (node: IInnerTreeNode) => void;
  toggleNode: (node: IInnerTreeNode) => void;
  expandAllNodes: () => void;
}

export default function () {
  return function useToggle(data: Ref<IInnerTreeNode[]>, core: IUseCore, context: SetupContext): IUseToggle {
    const { getNode, setNodeValue } = core;

    const expandNode = (node: IInnerTreeNode): void => {
      if (node.disableToggle) { return; }

      setNodeValue(node, 'expanded', true);
      context.emit('toggle-change', node);
    };

    const collapseNode = (node: IInnerTreeNode): void => {
      if (node.disableToggle) { return; }
      setNodeValue(node, 'expanded', false);
      context.emit('toggle-change', node);
    };

    const toggleNode = (node: IInnerTreeNode): void => {
      if (node.disableToggle) { return; }

      if (getNode(node).expanded) {
        collapseNode(node);
      } else {
        expandNode(node);
      }
    };

    const expandAllNodes = (): void => {
      data.value.forEach((node: IInnerTreeNode) => {
        expandNode(node);
      });
    };

    return {
      expandNode,
      collapseNode,
      toggleNode,
      expandAllNodes,
    };
  };
}

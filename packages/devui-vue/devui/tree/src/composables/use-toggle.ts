import { Ref, SetupContext } from 'vue';
import { IInnerTreeNode, IUseCore, IUseToggle } from './use-tree-types';

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

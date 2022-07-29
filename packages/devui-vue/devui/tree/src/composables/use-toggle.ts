import { Ref, SetupContext } from 'vue';
import { IInnerTreeNode, IUseCore, IUseToggle, IUseLazyLoad } from './use-tree-types';

export function useToggle() {
  return function useToggleFn(data: Ref<IInnerTreeNode[]>, core: IUseCore, context: SetupContext, lazyLode: IUseLazyLoad): IUseToggle {
    const { getNode, setNodeValue } = core;
    const { lazyLoadNodes } = lazyLode;

    const expandNode = (node: IInnerTreeNode): void => {
      if (node.disableToggle || node.loading) {
        return;
      }

      setNodeValue(node, 'expanded', true);
      context.emit('toggle-change', node);
    };

    const collapseNode = (node: IInnerTreeNode): void => {
      if (node.disableToggle || node.loading) {
        return;
      }
      setNodeValue(node, 'expanded', false);
      context.emit('toggle-change', node);
    };

    const toggleNode = (node: IInnerTreeNode): void => {
      if (node.disableToggle || node.loading) {
        return;
      }
      if (getNode(node).expanded) {
        collapseNode(node);
      } else {
        expandNode(node);
      }
      // 懒加载节点
      lazyLoadNodes(node);
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

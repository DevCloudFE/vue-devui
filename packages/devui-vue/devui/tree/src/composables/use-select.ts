import { Ref, SetupContext } from 'vue';
import { useInitSelectCollection } from './use-init-select-collection';
import { IInnerTreeNode, IUseCore, IUseSelect } from './use-tree-types';

export function useSelect() {
  return function useSelectFn(data: Ref<IInnerTreeNode[]>, core: IUseCore, context: SetupContext): IUseSelect {
    const { setNodeValue } = core;
    const { getInitSelectedNodes, clearInitSelectedNodes } = useInitSelectCollection();

    let prevActiveNode: IInnerTreeNode;

    const selectNode = (node: IInnerTreeNode): void => {
      if (node.disableSelect) {
        return;
      }

      const initSelectedNodes = getInitSelectedNodes();
      if (initSelectedNodes.length) {
        initSelectedNodes.forEach((item) => {
          setNodeValue(item, 'selected', false);
        });
        clearInitSelectedNodes();
      }

      if (prevActiveNode) {
        const prevActiveNodeIndex = data.value.findIndex((item) => item.id === prevActiveNode.id);
        setNodeValue(data.value[prevActiveNodeIndex], 'selected', false);
      }

      setNodeValue(node, 'selected', true);
      context.emit('select-change', node);
      prevActiveNode = node;
    };

    const deselectNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'selected', false);
      context.emit('select-change', node);
    };

    const toggleSelectNode = (node: IInnerTreeNode): void => {
      if (node.selected) {
        deselectNode(node);
      } else {
        selectNode(node);
      }
    };

    const getSelectedNode = (): IInnerTreeNode => {
      return data.value.find((node) => node.selected);
    };

    return {
      selectNode,
      deselectNode,
      toggleSelectNode,
      getSelectedNode,
    };
  };
}

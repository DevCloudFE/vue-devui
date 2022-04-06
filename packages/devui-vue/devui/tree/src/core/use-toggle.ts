import { Ref } from 'vue';
import { IInnerTreeNode, IUseCore } from './use-tree-types';

export default function useToggle(data: Ref<IInnerTreeNode[]>, core: IUseCore) {
  const { getNode, setNodeValue } = core;

  const expandNode = (node: IInnerTreeNode): void => {
    if (node.disableToggle) { return; }

    setNodeValue(node, 'expanded', true);
  }

  const collapseNode = (node: IInnerTreeNode): void => {
    if (node.disableToggle) { return; }
    
    setNodeValue(node, 'expanded', false);
  }

  const toggleNode = (node: IInnerTreeNode): void => {
    if (node.disableToggle) { return; }

    if (getNode(node).expanded) {
      setNodeValue(node, 'expanded', false);
    } else {
      setNodeValue(node, 'expanded', true);
    }
  }

  return {
    expandNode,
    collapseNode,
    toggleNode,
  }
}
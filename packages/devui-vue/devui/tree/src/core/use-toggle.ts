import { Ref } from 'vue';
import { IInnerTreeNode, ITreeNode, IUseCore } from './tree-factory-types';

export default function useToggle(data: Ref<IInnerTreeNode[]>, core: IUseCore) {
  console.log('useToggle:', data, data.value);

  const { getNode, setNodeValue } = core;

  const expandNode = (node: ITreeNode): void => {
    setNodeValue(node, 'expanded', true);
  }

  const collapseNode = (node: ITreeNode): void => {
    setNodeValue(node, 'expanded', false);
  }

  const toggleNode = (node: ITreeNode): void => {
    console.log('toggleNode node:', node);

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
import { Ref } from 'vue';
import { IInnerTreeNode, IUseCore } from './use-tree-types';

export interface IUseDisable {
  disableSelectNode: (node: IInnerTreeNode) => void;
  disableCheckNode: (node: IInnerTreeNode) => void;
  disableToggleNode: (node: IInnerTreeNode) => void;
  enableSelectNode: (node: IInnerTreeNode) => void;
  enableCheckNode: (node: IInnerTreeNode) => void;
  enableToggleNode: (node: IInnerTreeNode) => void;
}

export default function() {
  return function useDisable(data: Ref<IInnerTreeNode[]>, core: IUseCore): IUseDisable {
    const { setNodeValue } = core;

    const disableSelectNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'disableSelect', true);
    };

    const disableCheckNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'disableCheck', true);
    };

    const disableToggleNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'disableToggle', true);
    };

    const enableSelectNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'disableSelect', false);
    };

    const enableCheckNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'disableCheck', false);
    };

    const enableToggleNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'disableToggle', false);
    };

    return {
      disableSelectNode,
      disableCheckNode,
      disableToggleNode,
      enableSelectNode,
      enableCheckNode,
      enableToggleNode,
    };
  };
}

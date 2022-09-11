import { IInnerTreeNode, IUseInitSelectCollection } from './use-tree-types';

let selectedNodes: IInnerTreeNode[] = [];

export function useInitSelectCollection(): IUseInitSelectCollection {
  const setInitSelectedNode = (node: IInnerTreeNode): void => {
    selectedNodes.push(node);
  };

  const getInitSelectedNodes = (): IInnerTreeNode[] => {
    return selectedNodes;
  };

  const clearInitSelectedNodes = (): void => {
    selectedNodes = [];
  };

  return {
    setInitSelectedNode,
    getInitSelectedNodes,
    clearInitSelectedNodes,
  };
}

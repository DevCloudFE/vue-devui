import { Ref, SetupContext, ref } from 'vue';
import { IInnerTreeNode, IUseCore, LazyNodeResult, IUseLazyLoad } from './use-tree-types';
import { generateInnerTree } from './utils';

export function useLazyLoad() {
  return function useLazyLoadFn(data: Ref<IInnerTreeNode[]>, core: IUseCore, context: SetupContext): IUseLazyLoad {
    const { getNode, setNodeValue, getIndex, getChildren } = core;

    const setCommonParent = (node: IInnerTreeNode, nodes: Ref<IInnerTreeNode[]>) => {
      nodes.value.forEach((item) => {
        if (item.level - 1 === node.level && !item.parentId) {
          item.parentId = node.id;
        }
      });
    };
    // 插入子节点
    const insertChildrenNodes = (parent: IInnerTreeNode, nodes: Ref<IInnerTreeNode[]>) => {
      const parentIndex = getIndex(parent);
      if (parentIndex !== -1) {
        data.value.splice(parentIndex + 1, 0, ...nodes.value);
      }
    };

    const dealChildNodes = (result: LazyNodeResult) => {
      const node = getNode(result.node);
      setNodeValue(node, 'loading', false);
      const childNodes = ref<IInnerTreeNode[]>(generateInnerTree(result.treeItems, 'children', node.level));
      // 设置公共父节点
      setCommonParent(node, childNodes);
      // 插入children
      insertChildrenNodes(node, childNodes);
      // 更新childrenNodes数量
      const childrenNodes = getChildren(node);
      setNodeValue(node, 'childNodeCount', childrenNodes.length);
    };

    const lazyLoadNodes = (node: IInnerTreeNode): void => {
      const innerNode = getNode(node);
      if (!innerNode.isLeaf && !innerNode.childNodeCount) {
        setNodeValue(node, 'loading', true);
        context.emit('lazy-load', node, dealChildNodes);
      }
    };

    return {
      lazyLoadNodes,
    };
  };
}

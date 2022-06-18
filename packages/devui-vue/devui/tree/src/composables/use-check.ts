import { ref, Ref } from 'vue';
import { ICheckStrategy, IInnerTreeNode, IUseCore } from './use-tree-types';
export interface IUseCheck {
  checkNode: (node: IInnerTreeNode) => void;
  uncheckNode: (node: IInnerTreeNode) => void;
  toggleCheckNode: (node: IInnerTreeNode) => void;
}
export default function (
  options: Ref<{ checkStrategy: ICheckStrategy }> = ref({ checkStrategy: 'both' as ICheckStrategy })
) {
  return function useCheck(data: Ref<IInnerTreeNode[]>, core: IUseCore): IUseCheck {
    const { setNodeValue, getNode, getChildren, getParent } = core;

    const checkNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'checked', true);
    };

    const uncheckNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'checked', false);
    };

    const controlParentNodeChecked = (node: IInnerTreeNode, checked: boolean): void => {
      if (!node.parentId) {
        return;
      }
      const parentNode = getParent(node);
      if (!parentNode) {
        return;
      }
      // 子节点是否有选中
      let childChecked = checked;
      // 子节点选中后触发
      if (checked) {
        if (!parentNode.checked) {
          setNodeValue(parentNode, 'checked', true);
        }
      } else {
        // 子节点取消后触发
        const siblingNodes = getChildren(parentNode);
        const checkedSiblingNodes = siblingNodes.filter(item => item.checked && item.id !== node.id);
        // 子节点全部是取消状态
        if (checkedSiblingNodes.length === 0) {
          setNodeValue(parentNode, 'checked', false);
        } else {
          setNodeValue(parentNode, 'checked', true);
          childChecked = true;
        }
      }
      if (parentNode.parentId) {
        // 递归往上设置父节点的 checked 属性
        controlParentNodeChecked(parentNode, childChecked);
      }
    };

    const toggleCheckNode = (node: IInnerTreeNode): void => {
      const checked = getNode(node).checked;
      if (checked) {
        setNodeValue(node, 'checked', false);

        if (['downward', 'both'].includes(options.value.checkStrategy)) {
          getChildren(node).forEach(item => setNodeValue(item, 'checked', false));
        }
      } else {
        setNodeValue(node, 'checked', true);

        if (['downward', 'both'].includes(options.value.checkStrategy)) {
          getChildren(node).forEach(item => setNodeValue(item, 'checked', true));
        }
      }

      if (['upward', 'both'].includes(options.value.checkStrategy)) {
        controlParentNodeChecked(node, !checked);
      }
    };

    return {
      checkNode,
      uncheckNode,
      toggleCheckNode,
    };
  };
}

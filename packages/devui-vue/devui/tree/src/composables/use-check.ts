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

    const controlParentNodeChecked = (node: IInnerTreeNode): void => {
      const parentNode = getParent(node);
      if (!parentNode) {
        return;
      }
      const siblingNodes = getChildren(parentNode, { recursive: false });
      const checkedSiblingNodes = siblingNodes.filter(item => item.checked);

      // 根据子节点的勾选情况，动态设置父节点的 checked 属性
      const toggleParentChecked = () => {
        if (checkedSiblingNodes.length === 0) {
          setNodeValue(parentNode, 'checked', false);
        } else if (checkedSiblingNodes.length === siblingNodes.length) {
          setNodeValue(parentNode, 'checked', true);
        }
      };

      if (parentNode.parentId) {
        toggleParentChecked();

        // 递归往上设置父节点的 checked 属性
        controlParentNodeChecked(parentNode);
      } else {
        toggleParentChecked();
      }
    };

    const toggleCheckNode = (node: IInnerTreeNode): void => {
      if (getNode(node).checked) {
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
        controlParentNodeChecked(node);
      }
    };

    return {
      checkNode,
      uncheckNode,
      toggleCheckNode,
    };
  };
}

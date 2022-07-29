import { ref, Ref, SetupContext } from 'vue';
import { ICheckStrategy, IInnerTreeNode, IUseCore, IUseCheck } from './use-tree-types';
type ISetNodeValue = Parameters<IUseCore['setNodeValue']>;
export function useCheck(options: Ref<{ checkStrategy: ICheckStrategy }> = ref({ checkStrategy: 'both' as ICheckStrategy })) {
  return function useCheckFn(data: Ref<IInnerTreeNode[]>, core: IUseCore, context: SetupContext): IUseCheck {
    const { setNodeValue, getNode, getChildren, getParent } = core;

    const checkNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'checked', true);
      context.emit('check-change', node);
    };

    const setNodeValueInAvailable = (node: ISetNodeValue[0], key: ISetNodeValue[1], value: ISetNodeValue[2]) => {
      if (!node.disableCheck) {
        setNodeValue(node, key, value);
      }
    };

    const uncheckNode = (node: IInnerTreeNode): void => {
      setNodeValue(node, 'checked', false);
      context.emit('check-change', node);
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
          setNodeValueInAvailable(parentNode, 'checked', true);
        }
      } else {
        // 子节点取消后触发
        const siblingNodes = getChildren(parentNode);
        const checkedSiblingNodes = siblingNodes.filter((item) => item.checked && item.id !== node.id);
        // 子节点全部是取消状态
        if (checkedSiblingNodes.length === 0) {
          setNodeValueInAvailable(parentNode, 'checked', false);
        } else {
          setNodeValueInAvailable(parentNode, 'checked', true);
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
        context.emit('check-change', node);

        if (['downward', 'both'].includes(options.value.checkStrategy)) {
          getChildren(node).forEach((item) => setNodeValueInAvailable(item, 'checked', false));
        }
      } else {
        setNodeValue(node, 'checked', true);
        context.emit('check-change', node);

        if (['downward', 'both'].includes(options.value.checkStrategy)) {
          getChildren(node).forEach((item) => setNodeValueInAvailable(item, 'checked', true));
        }
      }

      if (['upward', 'both'].includes(options.value.checkStrategy)) {
        controlParentNodeChecked(node, !checked);
      }
    };

    const getCheckedNodes = () => {
      return data.value.filter((node) => node.checked);
    };

    return {
      checkNode,
      uncheckNode,
      toggleCheckNode,
      getCheckedNodes,
    };
  };
}

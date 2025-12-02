import { Ref, ref, toRaw } from 'vue';
import { randomId } from '../../../shared/utils';
import { IInnerTreeNode, ITreeNode, IUseCore, IUseOperate } from './use-tree-types';

export function useOperate() {
  return function useOperateFn(data: Ref<IInnerTreeNode[]>, core: IUseCore): IUseOperate {
    const { setNodeValue, getChildren, getIndex, getLevel, getParent, updateHashTreeData, getFlattenChildren } = core;

    const insertBefore = (parentNode: IInnerTreeNode, node: IInnerTreeNode, referenceNode?: IInnerTreeNode): void => {
      const children = getChildren(parentNode, {
        recursive: false,
      });
      const lastChild = children[children.length - 1];
      let insertedIndex = getIndex(parentNode) + 1;

      if (referenceNode) {
        insertedIndex = getIndex(referenceNode);
      } else if (lastChild) {
        insertedIndex = getIndex(lastChild) + 1;
      }

      setNodeValue(parentNode, 'expanded', true);
      setNodeValue(parentNode, 'isLeaf', false);
      let childrenLen = parentNode.childNodeCount;
      if (!childrenLen) {
        childrenLen = 0;
        setNodeValue(parentNode, 'childNodeCount', childrenLen + 1);
      }

      if (lastChild) {
        setNodeValue(lastChild, 'parentChildNodeCount', children.length + 1);
      }

      const currentNode = ref({
        ...node,
        level: getLevel(parentNode) + 1,
        parentId: parentNode.id,
        isLeaf: true,
        showNode: true,
        parentChildNodeCount: children.length + 1,
        currentIndex: lastChild && typeof lastChild.currentIndex === 'number' ? lastChild.currentIndex + 1 : 0,
      });

      if (currentNode.value.id === undefined) {
        currentNode.value.id = randomId();
      }

      parentNode.childList = [];
      data.value = data.value.slice(0, insertedIndex).concat(currentNode.value, data.value.slice(insertedIndex, data.value.length));
      data.value.forEach((item) => {
        if (item.parentId === parentNode.id) {
          setNodeValue(item, 'parentChildNodeCount', children.length + 1);
          parentNode.childList?.push(toRaw(item));
        }
      });
      parentNode.childList.forEach((v, i) => (v.currentIndex = i));
      parentNode.children = parentNode.childList;
      parentNode.isLeaf = !parentNode.children.length;
      updateHashTreeData();
    };

    const removeNode = (node: IInnerTreeNode, config = { recursive: true }): void => {
      if (!config.recursive) {
        getChildren(node).forEach((child) => {
          setNodeValue(child, 'level', getLevel(child) - 1);
        });
      }

      const children = getFlattenChildren(node);
      const removeIds = [node.id, ...children.map((v) => v.id)];
      data.value = data.value.filter((item) => !removeIds.includes(item.id));

      const parentNode = getParent(node);
      const originParentNode = toRaw(parentNode);
      if (parentNode && originParentNode) {
        const parentChildren = getChildren(parentNode);
        if (parentChildren?.length) {
          const list = originParentNode.childList || [];
          parentNode.childList = list.filter((item) => item.id !== node.id) ?? [];
          setNodeValue(parentNode, 'childNodeCount', list.length);
        } else {
          parentNode.childList = [];
          setNodeValue(parentNode, 'childNodeCount', 0);
          setNodeValue(parentNode, 'isLeaf', true);
          setNodeValue(parentNode, 'expanded', false);
        }
        parentNode.children = originParentNode.children;
      }

      updateHashTreeData();
    };

    const editNode = (node: IInnerTreeNode, label: string): void => {
      setNodeValue(node, 'label', label);
    };

    return {
      insertBefore,
      removeNode,
      editNode,
    };
  };
}

import { computed, ComputedRef, Ref, onUnmounted, shallowRef, toRaw, toValue } from 'vue';
import { IInnerTreeNode, ITreeNode, IUseCore, valueof } from './use-tree-types';
import { generateInnerTree } from './utils';

const DEFAULT_CONFIG = {
  expanded: false, // 是否只从展开了的节点中获取数据
  recursive: true, // 是否需要获取非直接子节点
};

export function useCore(): (data: Ref<IInnerTreeNode[]>) => IUseCore {
  const nodeMap = new Map<string, IInnerTreeNode[]>();
  return function useCoreFn(data: Ref<IInnerTreeNode[]>): IUseCore {
    const hashTreeData = shallowRef<Record<string | number, IInnerTreeNode>>({});

    const updateHashTreeData = () => {
      hashTreeData.value = {};
      for (let i = 0; i < data.value.length; i++) {
        const item = data.value[i];
        if (hashTreeData.value[item.id]) {
          console.error(`节点id【${item.id}】重复`);
        } else {
          hashTreeData.value[item.id] = item;
        }
      }
    };

    const getInnerNode = (node: IInnerTreeNode | ITreeNode) => {
      if (!node) {
        return null;
      }
      if (node.id != undefined && hashTreeData.value[node.id]) {
        return hashTreeData.value[node.id];
      }
      return null;
    };
    const getLevel = (node: IInnerTreeNode) => {
      const innerNode = getInnerNode(node);
      if (innerNode) {
        return innerNode.level;
      }
      return undefined;
    };

    const toggleChildNodeVisible = (node: IInnerTreeNode, visible: boolean) => {
      if (!node.childList?.length) {
        return;
      }
      const nodeList = [...node.childList];
      while (nodeList.length) {
        const item = nodeList.shift();
        if (item) {
          item.showNode = visible;
          if ((visible && item.expanded) || (!visible && item.childNodeCount)) {
            const temp = item.childList || [];
            nodeList.push(...temp);
          }
        }
      }
    };

    const getInnerExpendedTree = (): ComputedRef<IInnerTreeNode[]> => {
      return computed(() => {
        let excludeNodes: IInnerTreeNode[] = [];
        const result = [];
        for (let i = 0, len = data?.value.length; i < len; i++) {
          const item = data?.value[i];
          if (excludeNodes.map((innerNode) => innerNode.id).includes(item.id)) {
            continue;
          }
          if (item.expanded !== true && !item.isLeaf) {
            excludeNodes = getChildren(item);
          }
          result.push(item);
        }
        return result;
      });
    };

    const getChildren = (node: IInnerTreeNode, userConfig = DEFAULT_CONFIG): IInnerTreeNode[] => {
      if (node.isLeaf) {
        return [];
      }
      let mapKey = node.id || '';
      if (userConfig.expanded) {
        mapKey += '_expanded';
      }
      if (userConfig.recursive) {
        mapKey += '_recursive';
      }
      if (node.id && nodeMap.has(mapKey)) {
        const cacheNode = nodeMap.get(node.id);
        if (cacheNode) {
          return cacheNode;
        }
      }

      const result = [];
      const config = { ...DEFAULT_CONFIG, ...userConfig };
      const treeData = config.expanded ? getInnerExpendedTree() : data;
      const startIndex = treeData.value.findIndex((item) => item.id === node.id);
      const nodeLevel = node.level;

      for (let i = startIndex + 1; i < treeData.value.length && nodeLevel < treeData.value[i].level; i++) {
        if (config.recursive && !treeData.value[i].isHide) {
          result.push(treeData.value[i]);
        } else if (nodeLevel === treeData.value[i].level - 1 && !treeData.value[i].isHide) {
          result.push(treeData.value[i]);
        }
      }
      if (node.id) {
        nodeMap.set(mapKey, result);
      }
      return result;
    };

    const clearNodeMap = () => {
      nodeMap.clear();
    };

    const getParent = (node: IInnerTreeNode) => {
      if (node.parentId !== undefined) {
        return hashTreeData.value[node.parentId];
      }
      return undefined;
    };

    const getLastChild = (node: IInnerTreeNode) => {
      const children = getChildren(node, { recursive: false });
      const lastChild = children[children.length - 1];
      return lastChild?.childNodeCount ? getLastChild(lastChild) : lastChild;
    };

    const getFlattenChildren = (node: IInnerTreeNode) => {
      const lastChild = getLastChild(node);
      const startPos = getIndex(node) + 1;
      const endPos = lastChild ? getIndex(lastChild) + 1 : startPos;
      return data.value.slice(startPos, endPos);
    };

    let showTreeList: ComputedRef<IInnerTreeNode[]>;

    const getExpendedTree = (): ComputedRef<IInnerTreeNode[]> => {
      if (showTreeList) {
        return showTreeList;
      }
      showTreeList = computed(() => {
        const res: IInnerTreeNode[] = [];
        const originDataVal = toValue(data);
        for (const item of originDataVal) {
          if (!item.isHide && item.showNode) {
            res.push(item);
          }
        }
        return res;
      });
      return showTreeList;
    };

    const getIndex = (node: IInnerTreeNode): number => {
      if (!node) {
        return -1;
      }

      return data.value.findIndex((item) => item.id === node.id);
    };

    const getNode = (node: IInnerTreeNode | string | number) => {
      if (typeof node === 'string' || typeof node === 'number') {
        return hashTreeData.value[node];
      } else {
        return getInnerNode(node) ?? undefined;
      }
    };

    const setNodeValue = (node: IInnerTreeNode, key: keyof IInnerTreeNode, value: valueof<IInnerTreeNode>): void => {
      clearNodeMap();
      const innerNode = getInnerNode(node);
      if (!innerNode) {
        return;
      }
      innerNode[key] = value;
    };

    const setTree = (newTree: ITreeNode[]): void => {
      clearNodeMap();
      data.value = generateInnerTree(newTree);
      updateHashTreeData();
    };

    const getTree = () => {
      return data.value;
    };

    onUnmounted(() => {
      clearNodeMap();
    });

    return {
      getLevel,
      getChildren,
      clearNodeMap,
      getParent,
      getExpendedTree,
      getIndex,
      getNode,
      setNodeValue,
      setTree,
      getTree,
      updateHashTreeData,
      toggleChildNodeVisible,
      hashTreeData,
      getFlattenChildren,
    };
  };
}

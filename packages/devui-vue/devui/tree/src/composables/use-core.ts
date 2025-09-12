import { computed, ComputedRef, Ref, onUnmounted } from 'vue';
import { IInnerTreeNode, ITreeNode, IUseCore, valueof } from './use-tree-types';
import { generateInnerTree } from './utils';

const DEFAULT_CONFIG = {
  expanded: false, // 是否只从展开了的节点中获取数据
  recursive: true, // 是否需要获取非直接子节点
};

export function useCore(): (data: Ref<IInnerTreeNode[]>) => IUseCore {
  const nodeMap = new Map<string, IInnerTreeNode[]>();
  return function useCoreFn(data: Ref<IInnerTreeNode[]>): IUseCore {
    const getLevel = (node: IInnerTreeNode): number => {
      return data.value.find((item) => item.id === node.id)?.level;
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
      const result = [];
      const config = { ...DEFAULT_CONFIG, ...userConfig };
      const treeData = config.expanded ? getInnerExpendedTree() : data;
      const startIndex = treeData.value.findIndex((item) => item.id === node.id);

      for (let i = startIndex + 1; i < treeData.value.length && getLevel(node) < treeData.value[i].level; i++) {
        if (config.recursive && !treeData.value[i].isHide) {
          result.push(treeData.value[i]);
        } else if (getLevel(node) === treeData.value[i].level - 1 && !treeData.value[i].isHide) {
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

    const getParent = (node: IInnerTreeNode): IInnerTreeNode => {
      return data.value.find((item) => item.id === node.parentId);
    };

    const getExpendedTree = (): ComputedRef<IInnerTreeNode[]> => {
      return computed(() => {
        let excludeNodes: IInnerTreeNode[] = [];
        const result = [];
        for (let i = 0, len = data?.value.length; i < len; i++) {
          const item = data?.value[i];
          if (excludeNodes.map((node) => node.id).includes(item.id) || item.isHide) {
            continue;
          }
          if (item.expanded !== true) {
            excludeNodes = getChildren(item);
          }
          result.push(item);
        }
        return result;
      });
    };

    const getIndex = (node: IInnerTreeNode): number => {
      if (!node) {
        return -1;
      }

      return data.value.findIndex((item) => item.id === node.id);
    };

    const getNode = (node: IInnerTreeNode): IInnerTreeNode => {
      return data.value.find((item) => item.id === node.id);
    };

    const setNodeValue = (node: IInnerTreeNode, key: keyof IInnerTreeNode, value: valueof<IInnerTreeNode>): void => {
      clearNodeMap();
      if (getIndex(node) !== -1) {
        data.value[getIndex(node)][key] = value;
      }
    };

    const setTree = (newTree: ITreeNode[]): void => {
      clearNodeMap();
      data.value = generateInnerTree(newTree);
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
    };
  };
}

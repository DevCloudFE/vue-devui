import { ref } from 'vue';
import { IInnerTreeNode, ITreeNode, IUseCore, IUseTree } from './tree-factory-types';
import useToggle from './use-toggle';
import useCore from './use-core';
import { generateInnerTree } from './utils';

export const DEFAULT_TREE_PLUGINS = [useCore, useToggle];

export default function useTree(tree: ITreeNode[], plugins = []): Partial<IUseTree> {
  const treeData = ref<IInnerTreeNode[]>(generateInnerTree(tree));

  const core: IUseCore = useCore(treeData);

  const pluginMethods = DEFAULT_TREE_PLUGINS.concat(plugins).reduce((acc, plugin) => {
    return { ...acc, ...plugin(treeData, core) };
  }, {});

  return {
    treeData,
    ...pluginMethods,
  };
}

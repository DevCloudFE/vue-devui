import { ref } from 'vue';
import { IInnerTreeNode, ITreeNode, IUseCore, IUseTree } from './use-tree-types';
import useToggle from './use-toggle';
import useCore from './use-core';
import { generateInnerTree } from './utils';

export const DEFAULT_TREE_PLUGINS = [useCore(), useToggle()];

export default function useTree(tree: ITreeNode[], plugins = []): Partial<IUseTree> {
  const treeData = ref<IInnerTreeNode[]>(generateInnerTree(tree));

  // TODO: useCore会在useTree是执行两次的问题待解决
  const core: IUseCore = useCore()(treeData);

  const pluginMethods = DEFAULT_TREE_PLUGINS.concat(plugins).reduce((acc, plugin) => {
    return { ...acc, ...plugin(treeData, core) };
  }, {});

  return {
    treeData,
    ...pluginMethods,
  };
}

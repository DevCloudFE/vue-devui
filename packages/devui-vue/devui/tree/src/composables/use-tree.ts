import { ref, SetupContext } from 'vue';
import { IInnerTreeNode, ITreeNode, IUseCore, IUseTree } from './use-tree-types';
import { useToggle } from './use-toggle';
import { useCore } from './use-core';
import { useLazyLoad } from './use-lazy-load';
import { generateInnerTree } from './utils';

export const DEFAULT_TREE_PLUGINS = [useToggle()];

export function useTree(tree: ITreeNode[], plugins = [], context: SetupContext): Partial<IUseTree> {
  const treeData = ref<IInnerTreeNode[]>(generateInnerTree(tree));
  const core: IUseCore = useCore()(treeData);

  // 因为展开操作和懒加载有耦合，需要此处引入
  const lazyLode = useLazyLoad()(treeData, core, context);

  const pluginMethods = DEFAULT_TREE_PLUGINS.concat(plugins).reduce((acc, plugin) => {
    return { ...acc, ...plugin(treeData, core, context, lazyLode) };
  }, {});

  return {
    treeData,
    ...pluginMethods,
    ...core,
  };
}

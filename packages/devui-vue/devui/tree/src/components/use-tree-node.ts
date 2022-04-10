import { computed, ComputedRef, inject } from 'vue';
import { NODE_HEIGHT, NODE_INDENT, USE_TREE_TOKEN } from '../const';
import { IInnerTreeNode, IUseTree } from '../core/use-tree-types';

export default function useTreeNode(data: ComputedRef<IInnerTreeNode>) {
  const { getChildren } = inject<IUseTree>(USE_TREE_TOKEN);

  const nodeClass = computed(() => [
    'devui-tree-node',
    data.value?.expanded && 'devui-tree-node__open',
  ]);
  const nodeStyle = computed(() => {return { paddingLeft: `${NODE_INDENT * (data.value?.level - 1)}px` }});

  const nodeVLineClass = computed(() => [
    !data.value?.isLeaf && data.value?.expanded && 'devui-tree-node__vline',
  ]);
  const nodeVLineStyle = computed(() => {return {
    height: `${NODE_HEIGHT * (getChildren(data.value, true).length - 1) + NODE_HEIGHT / 2 + 1}px`,
    left: `${NODE_INDENT * (data.value?.level - 1) + 9}px`,
    top: `${NODE_HEIGHT}px`,
  }});
  const nodeHLineClass = computed(() => [
    data.value?.level !== 1 && 'devui-tree-node__hline',
  ]);

  const nodeContentClass = computed(() => [
    'devui-tree-node__content',
    data.value?.selected && 'active'
  ]);

  const nodeTitleClass = computed(() => [
    'devui-tree-node__title',
    data.value?.disableSelect && 'select-disabled'
  ]);

  return {
    nodeClass,
    nodeStyle,
    nodeContentClass,
    nodeTitleClass,
    nodeVLineClass,
    nodeVLineStyle,
    nodeHLineClass,
  };
}

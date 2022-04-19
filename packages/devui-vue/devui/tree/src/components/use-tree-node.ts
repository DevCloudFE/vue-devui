import type { ComputedRef } from 'vue';
import { computed, inject } from 'vue';
import { NODE_HEIGHT, NODE_INDENT, USE_TREE_TOKEN } from '../const';
import { IInnerTreeNode, IUseTree } from '../core/use-tree-types';

export interface IUseTreeNode {
  nodeClass: ComputedRef<(string | false | undefined)[]>;
  nodeStyle: ComputedRef<{ paddingLeft: string }>;
  nodeContentClass: ComputedRef<(string | false | undefined)[]>;
  nodeTitleClass: ComputedRef<(string | false | undefined)[]>;
  nodeVLineClass: ComputedRef<(string | false | undefined)[]>;
  nodeVLineStyle: ComputedRef<{ height: string; left: string; top: string }>;
  nodeHLineClass: ComputedRef<(string | false | undefined)[]>;
}

export default function useTreeNode(data: ComputedRef<IInnerTreeNode>): IUseTreeNode {
  const { getChildren } = inject(USE_TREE_TOKEN) as Partial<IUseTree>;

  const nodeClass = computed(() => [
    'devui-tree-node',
    data.value?.expanded && 'devui-tree-node__open',
  ]);
  const nodeStyle = computed(() => {
    return { paddingLeft: `${NODE_INDENT * (data.value?.level - 1)}px` };
  });

  const nodeVLineClass = computed(() => [
    !data.value?.isLeaf && data.value?.expanded && 'devui-tree-node__vline',
  ]);
  const nodeVLineStyle = computed(() => {
    return {
      height: `${NODE_HEIGHT * (
        getChildren(data.value, { expanded: true }).length - 1
      ) + NODE_HEIGHT / 2 + 1}px`,
      left: `${NODE_INDENT * (data.value?.level - 1) + 9}px`,
      top: `${NODE_HEIGHT}px`,
    };
  });
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

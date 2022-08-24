import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { NODE_HEIGHT, NODE_INDENT } from '../const';
import { IInnerTreeNode } from './use-tree-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

const ns = useNamespace('tree');

export interface IUseTreeNode {
  nodeClass: ComputedRef<(string | false | undefined)[]>;
  nodeStyle: ComputedRef<{ paddingLeft: string }>;
  nodeContentClass: ComputedRef<(string | false | undefined)[]>;
  nodeTitleClass: ComputedRef<(string | false | undefined)[]>;
  nodeVLineClass: ComputedRef<(string | false | undefined)[]>;
  nodeVLineStyles: ComputedRef<{ height: string; left: string; top: string }[]>;
  nodeHLineClass: ComputedRef<(string | false | undefined)[]>;
  nodeOperationAreaClass: ComputedRef<string>;
  matchedContents: ComputedRef<string[]>;
  highlightCls: string;
}

export function useTreeNode(data: ComputedRef<IInnerTreeNode>): IUseTreeNode {
  const nodeClass = computed(() => [ns.e('node'), data.value?.expanded && ns.em('node', 'open')]);
  const nodeStyle = computed(() => {
    return { paddingLeft: `${NODE_INDENT * (data.value?.level - 1)}px` };
  });

  const nodeVLineClass = computed(() => [data.value?.level !== 1 && ns.e('node-vline')]);
  const nodeVLineStyles = computed(() => {
    if (!data.value || data.value.level === 1) {
      return [];
    }
    const { currentIndex = 0, parentChildNodeCount = 0, level, expanded, isLeaf } = data.value;
    return Array.from({ length: data.value.level - 1 }).map((_, index) => ({
      height: `${
        currentIndex + 1 === parentChildNodeCount && index === 0 ? (isLeaf || !expanded ? NODE_HEIGHT / 2 : NODE_HEIGHT) : NODE_HEIGHT
      }px`,
      left: `${NODE_INDENT * (level - index - 2) + 9}px`,
      top: `0px`,
    }));
  });
  const nodeHLineClass = computed(() => [data.value?.level !== 1 && ns.e('node-hline')]);

  const nodeContentClass = computed(() => [ns.e('node-content'), data.value?.selected && 'active']);

  const nodeTitleClass = computed(() => [ns.e('node-title'), data.value?.disableSelect && 'select-disabled']);

  const nodeOperationAreaClass = computed(() => ns.e('node-operation-area'));

  const matchedContents = computed(() => {
    const matchItem = data.value?.matchedText || '';
    const label = data.value?.label || '';
    const reg = (str: string) => str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regExp = new RegExp('(' + reg(matchItem) + ')', 'gi');
    return label.split(regExp);
  });

  const highlightCls = ns.e('match-highlight');

  return {
    nodeClass,
    nodeStyle,
    nodeContentClass,
    nodeTitleClass,
    nodeVLineClass,
    nodeVLineStyles,
    nodeHLineClass,
    nodeOperationAreaClass,
    matchedContents,
    highlightCls,
  };
}

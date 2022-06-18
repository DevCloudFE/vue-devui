import { defineComponent, provide, ref, renderSlot, toRefs, useSlots, watch } from 'vue';
import type { IInnerTreeNode, ICheckStrategy } from './composables/use-tree-types';
import DTreeNode from './components/tree-node';
import DTreeNodeContent from './components/tree-node-content';
import DTreeNodeToggle from './components/tree-node-toggle';
import { VirtualList } from '../../virtual-list';
import useTree from './composables/use-tree';
import useCheck from './composables/use-check';
import useSelect from './composables/use-select';
import useOperate from './composables/use-operate';
import useMergeNodes from './composables/use-merge-nodes';
import { USE_TREE_TOKEN, NODE_HEIGHT } from './const';
import { TreeProps, treeProps } from './tree-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { formatCheckStatus } from './utils';
import './tree.scss';

export default defineComponent({
  name: 'DTree',
  props: treeProps,
  setup(props: TreeProps, { slots, expose }) {
    const { data, check } = toRefs(props);
    const ns = useNamespace('tree');

    const userPlugins = [useSelect(), useOperate(), useMergeNodes()];

    const checkOptions = ref<{ checkStrategy: ICheckStrategy }>({
      checkStrategy: formatCheckStatus(check.value)
    });

    watch(check, (newVal) => {
      checkOptions.value.checkStrategy = formatCheckStatus(newVal);
    });

    if (check.value) {
      userPlugins.push(useCheck(checkOptions));
    }

    const treeFactory = useTree(data.value, userPlugins);

    const { setTree, getExpendedTree, toggleNode } = treeFactory;

    // 外部同步内部
    watch(data, setTree);

    provide(USE_TREE_TOKEN, treeFactory);

    expose({
      treeFactory,
    });

    const renderDTreeNode = (treeNode: IInnerTreeNode) =>
      slots.default ? (
        renderSlot(useSlots(), 'default', {
          treeFactory: treeFactory,
          nodeData: treeNode,
        })
      ) : (
        <DTreeNode data={treeNode} check={check.value}>
          {{
            default: () =>
              slots.content ? renderSlot(useSlots(), 'content', { nodeData: treeNode }) : <DTreeNodeContent data={treeNode} />,
            icon: () =>
              slots.icon ? renderSlot(useSlots(), 'icon', { nodeData: treeNode, toggleNode }) : <DTreeNodeToggle data={treeNode} />,
          }}
        </DTreeNode>
      );

    return () => {
      const Component = props.height ? VirtualList : 'div';
      const treeData = getExpendedTree?.().value;
      const vSlotsProps = {
        default: props.height || (() => treeData?.map(renderDTreeNode)),
        item: props.height && ((treeNode: IInnerTreeNode) => renderDTreeNode(treeNode))
      };
      let virtualListProps = {};
      if (props.height) {
        virtualListProps = {
          height: props.height,
          data: treeData,
          itemHeight: NODE_HEIGHT,
        };
      }
      return (
        <Component
          class={ns.b()}
          {...virtualListProps}
          v-slots={vSlotsProps}
        />
      );
    };
  },
});

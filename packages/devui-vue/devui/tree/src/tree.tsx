import { defineComponent, getCurrentInstance, provide, ref, renderSlot, SetupContext, toRefs, TransitionGroup, useSlots, watch } from 'vue';
import DTreeNode from './components/tree-node';
import DTreeNodeContent from './components/tree-node-content';
import DTreeNodeToggle from './components/tree-node-toggle';
import DTreeNodeLoading from './components/tree-node-loading';
import { VirtualList } from '../../virtual-list';
import {
  useTree,
  useCheck,
  useSelect,
  useOperate,
  useMergeNodes,
  useSearchFilter,
  IInnerTreeNode,
  ICheckStrategy,
  useDragdrop,
} from './composables';
import { USE_TREE_TOKEN, NODE_HEIGHT, TREE_INSTANCE } from './const';
import { TreeProps, treeProps } from './tree-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { formatCheckStatus, formatBasicTree } from './utils';
import './tree.scss';

export default defineComponent({
  name: 'DTree',
  props: treeProps,
  emits: ['toggle-change', 'check-change', 'select-change', 'node-click', 'lazy-load'],
  setup(props: TreeProps, context: SetupContext) {
    const { slots, expose } = context;
    const treeInstance = getCurrentInstance();
    const { check, dragdrop, operate } = toRefs(props);
    const ns = useNamespace('tree');
    const normalRef = ref();
    const data = ref<IInnerTreeNode[]>(formatBasicTree(props.data));

    const userPlugins = [useSelect(), useOperate(), useMergeNodes(), useSearchFilter()];

    const checkOptions = ref<{ checkStrategy: ICheckStrategy }>({
      checkStrategy: formatCheckStatus(check.value),
    });

    if (check.value) {
      userPlugins.push(useCheck(checkOptions) as never);
    }

    if (dragdrop.value) {
      userPlugins.push(useDragdrop(props, data) as never);
    }

    const treeFactory = useTree(data.value, userPlugins as never[], context);

    const { setTree, getExpendedTree, toggleNode, virtualListRef } = treeFactory;

    // 外部同步内部
    watch(data, setTree);

    watch(
      () => props.data,
      (newVal) => {
        data.value = formatBasicTree(newVal);
      }
    );

    watch(check, (newVal) => {
      checkOptions.value.checkStrategy = formatCheckStatus(newVal);
    });

    provide(USE_TREE_TOKEN, treeFactory);
    provide(TREE_INSTANCE, treeInstance);

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
        <DTreeNode data={treeNode} check={check.value} dragdrop={dragdrop.value} operate={operate.value} key={treeNode.id}>
          {{
            default: () =>
              slots.content ? renderSlot(useSlots(), 'content', { nodeData: treeNode }) : <DTreeNodeContent data={treeNode} />,
            icon: () =>
              slots.icon ? renderSlot(useSlots(), 'icon', { nodeData: treeNode, toggleNode }) : <DTreeNodeToggle data={treeNode} />,
            loading: () => (slots.loading ? renderSlot(useSlots(), 'loading', { nodeData: treeNode }) : <DTreeNodeLoading />),
          }}
        </DTreeNode>
      );

    return () => {
      const treeData = getExpendedTree?.().value;
      const vSlotsProps = {
        item: (treeNode: IInnerTreeNode) => renderDTreeNode(treeNode),
      };
      let virtualListProps = {};
      if (props.height) {
        virtualListProps = {
          height: props.height,
          data: treeData,
          itemHeight: NODE_HEIGHT,
        };
      }
      return props.height ? (
        <VirtualList ref={virtualListRef} class={ns.b()} {...virtualListProps} v-slots={vSlotsProps} />
      ) : (
        <div ref={normalRef} class={ns.b()}>
          <TransitionGroup name={ns.m('list')}>{treeData?.map(renderDTreeNode)}</TransitionGroup>
        </div>
      );
    };
  },
});

import { defineComponent, getCurrentInstance, provide, ref, renderSlot, SetupContext, toRefs, useSlots, watch } from 'vue';
import DTreeNode from './components/tree-node';
import DTreeNodeContent from './components/tree-node-content';
import DTreeNodeToggle from './components/tree-node-toggle';
import DTreeNodeLoading from './components/tree-node-loading';
import { VirtualList } from '../../virtual-list';
import { useTree, useCheck, useSelect, useOperate, useMergeNodes, useSearchFilter, IInnerTreeNode, ICheckStrategy } from './composables';
import { USE_TREE_TOKEN, NODE_HEIGHT, TREE_INSTANCE } from './const';
import { TreeProps, treeProps } from './tree-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { formatCheckStatus } from './utils';
import './tree.scss';

export default defineComponent({
  name: 'DTree',
  props: treeProps,
  emits: ['toggle-change', 'check-change', 'select-change', 'node-click', 'lazy-load'],
  setup(props: TreeProps, context: SetupContext) {
    const { slots, expose } = context;
    const treeInstance = getCurrentInstance();
    const { data, check, operate } = toRefs(props);
    const ns = useNamespace('tree');
    const normalRef = ref();

    const userPlugins = [useSelect(), useOperate(), useMergeNodes(), useSearchFilter()];

    const checkOptions = ref<{ checkStrategy: ICheckStrategy }>({
      checkStrategy: formatCheckStatus(check.value),
    });

    watch(check, (newVal) => {
      checkOptions.value.checkStrategy = formatCheckStatus(newVal);
    });

    if (check.value) {
      userPlugins.push(useCheck(checkOptions));
    }

    const treeFactory = useTree(data.value, userPlugins, context);

    const { setTree, getExpendedTree, toggleNode, virtualListRef } = treeFactory;

    // 外部同步内部
    watch(data, setTree);

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
        <DTreeNode data={treeNode} check={check.value} operate={operate.value}>
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
      const Component = props.height ? VirtualList : 'div';
      const treeData = getExpendedTree?.().value;
      const vSlotsProps = {
        default: () => treeData?.map(renderDTreeNode),
        item: props.height && ((treeNode: IInnerTreeNode) => renderDTreeNode(treeNode)),
      };
      let virtualListProps = {};
      if (props.height) {
        virtualListProps = {
          height: props.height,
          data: treeData,
          itemHeight: NODE_HEIGHT,
        };
      }
      return <Component ref={props.height ? virtualListRef : normalRef} class={ns.b()} {...virtualListProps} v-slots={vSlotsProps} />;
    };
  },
});

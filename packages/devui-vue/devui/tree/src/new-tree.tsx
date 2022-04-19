import { defineComponent, provide, ref, renderSlot, toRefs, useSlots, watch } from 'vue';
import DTreeNode from './components/tree-node';
import DTreeNodeContent from './components/tree-node-content';
import DTreeNodeToggle from './components/tree-node-toggle';
import useTree from './core/use-tree';
import useCheck from './core/use-check';
import useSelect from './core/use-select';
import { USE_TREE_TOKEN } from './const';
import useOperate from './core/use-operate';
import { TreeProps, treeProps } from './new-tree-types';
import './tree.scss';

export default defineComponent({
  name: 'DNewTree',
  props: treeProps,
  setup(props: TreeProps, { slots }) {
    const { data, check } = toRefs(props);

    const userPlugins = [
      useSelect(),
      useOperate(),
    ];

    const checkOptions = ref({
      checkStrategy: check.value || 'both'
    });

    watch(check, (newVal) => {
      checkOptions.value.checkStrategy = newVal;
    });

    if (check.value) {
      userPlugins.push(useCheck(checkOptions));
    }

    const treeFactory = useTree(
      data.value,
      userPlugins
    );

    const {
      setTree,
      getExpendedTree,
      toggleNode,
    } = treeFactory;

    // 外部同步内部
    watch(data, setTree);

    provide(USE_TREE_TOKEN, treeFactory);

    return () => {
      return (
        <div class="devui-tree">
          {
            getExpendedTree?.().value.map(treeNode => (
              slots.default
                ? renderSlot(useSlots(), 'default', {
                  treeFactory: treeFactory, nodeData: treeNode
                })
                : <DTreeNode data={treeNode} check={check.value}>
                  {{
                    default: () => slots.content
                      ? renderSlot(useSlots(), 'content', { nodeData: treeNode })
                      : <DTreeNodeContent data={treeNode} />,
                    icon: () => slots.icon
                      ? renderSlot(useSlots(), 'icon', { nodeData: treeNode, toggleNode })
                      : <DTreeNodeToggle data={treeNode} />,
                  }}
                </DTreeNode>
            ))
          }
        </div>
      );
    };
  }
});

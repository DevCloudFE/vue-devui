import { defineComponent, provide, ref, renderSlot, toRefs, useSlots, watch } from 'vue';
import DTreeNode from './components/tree-node';
import DTreeNodeContent from './components/tree-node-content';
import DTreeNodeToggle from './components/tree-node-toggle';
import useTree from './composables/use-tree';
import useCheck from './composables/use-check';
import useSelect from './composables/use-select';
import useOperate from './composables/use-operate';
import useMergeNodes from './composables/use-merge-nodes';
import { USE_TREE_TOKEN } from './const';
import { TreeProps, treeProps } from './tree-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './tree.scss';

export default defineComponent({
  name: 'DTree',
  props: treeProps,
  setup(props: TreeProps, { slots, expose }) {
    const { data, check } = toRefs(props);
    const ns = useNamespace('tree');

    const userPlugins = [useSelect(), useOperate(), useMergeNodes()];

    const checkOptions = ref({
      checkStrategy: check.value || 'both',
    });

    watch(check, (newVal) => {
      checkOptions.value.checkStrategy = newVal;
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

    return () => {
      return (
        <div class={ns.b()}>
          {getExpendedTree?.().value.map((treeNode) =>
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
            )
          )}
        </div>
      );
    };
  },
});

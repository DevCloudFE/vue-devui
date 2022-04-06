import { defineComponent, PropType, provide, renderSlot, toRefs, useSlots, watch } from 'vue';
import type { ITreeNode } from './core/use-tree-types';
import DTreeNode from './components/tree-node';
import DTreeNodeContent from './components/tree-node-content';
import DTreeNodeToggle from './components/tree-node-toggle';
import useTree from './core/use-tree';
import useCheck from './core/use-check';
import useSelect from './core/use-select';
import { USE_TREE_TOKEN } from './const';
import './tree.scss';
import useOperate from './core/use-operate';

export default defineComponent({
  name: 'DNewTree',
  props: {
    data: {
      type: Object as PropType<ITreeNode[]>,
      default: []
    }
  },
  setup(props, { slots }) {
    const { data } = toRefs(props);

    const treeFactory = useTree(
      data.value,
      [useSelect, useCheck, useOperate]
    );

    const {
      setTree,
      getExpendedTree,
      toggleNode,
      insertBefore,
    } = treeFactory;

    // 外部同步内部
    watch(data, setTree);

    provide(USE_TREE_TOKEN, treeFactory);
    
    return () => {
      return (
        <div class="devui-tree">
          {
            getExpendedTree().value.map(treeNode => (
              slots.default
              ? renderSlot(useSlots(), 'default', {
                  treeFactory: treeFactory, nodeData: treeNode
                })
              : <DTreeNode data={treeNode}>
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
    }
  }
});

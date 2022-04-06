import { defineComponent, PropType, provide, renderSlot, toRefs, useSlots, watch } from 'vue';
import type { ITreeNode } from './core/use-tree-types';
import DTreeNode from './components/tree-node';
import useTree from './core/use-tree';
import useCheck from './core/use-check';
import useSelect from './core/use-select';
import { USE_TREE_TOKEN } from './const';
import './tree.scss';

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
      [useSelect, useCheck]
    );

    const {
      setTree,
      getExpendedTree,
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
              : <DTreeNode data={treeNode} />
            ))
          }
        </div>
      );
    }
  }
});

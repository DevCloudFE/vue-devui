import { defineComponent, inject, PropType, ref, toRefs } from 'vue';
import { USE_TREE_TOKEN } from '../const';
import { ITreeNode } from '../core/tree-factory-types';
import DTreeNodeToggle from './tree-node-toggle';

export default defineComponent({
  name: 'DTreeNode',
  props: {
    data: {
      type: Object as PropType<ITreeNode>,
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const { selectNode } = inject(USE_TREE_TOKEN);

    return () => {
      return (
        <div
          class={['devui-tree-node', data.value.expanded && 'devui-tree-node__open']}
          style={{ paddingLeft: `${24 * (data.value.level - 1)}px` }}>
          <div class={['devui-tree-node__content', data.value?.selected && 'active']} onClick={() => {
            selectNode(data.value);
          }}>
            <div class="devui-tree-node__content--value-wrapper">
              <DTreeNodeToggle data={data.value} />
              <span class="devui-tree-node__title">{data.value.label}</span>
            </div>
          </div>
        </div>
      );
    };
  },
});

import { defineComponent, PropType, ref, toRefs } from 'vue';
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

    return () => {
      return (
        <div
          class={['devui-tree-node', data.value.expanded && 'devui-tree-node__open']}
          style={{ paddingLeft: `${24 * (data.value.level - 1)}px` }}>
          <div class="devui-tree-node__content">
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

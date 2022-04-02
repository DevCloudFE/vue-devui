import { defineComponent, inject, PropType, toRefs } from 'vue';
import { USE_TREE_TOKEN } from '../const';
import { IInnerTreeNode } from '../core/use-tree-types';
import DTreeNodeToggle from './tree-node-toggle';
import { Checkbox } from '../../../checkbox';

export default defineComponent({
  name: 'DTreeNode',
  props: {
    data: {
      type: Object as PropType<IInnerTreeNode>,
    },
  },
  setup(props) {
    const { data } = toRefs(props);
    const { selectNode, toggleCheckNode } = inject(USE_TREE_TOKEN);

    return () => {
      return (
        <div
          class={['devui-tree-node', data.value?.expanded && 'devui-tree-node__open']}
          style={{ paddingLeft: `${24 * (data.value?.level - 1)}px` }}>
          <div class={['devui-tree-node__content', data.value?.selected && 'active']} onClick={() => {
            selectNode(data.value);
          }}>
            <DTreeNodeToggle data={data.value} />
            <div class="devui-tree-node__content--value-wrapper">
              { <Checkbox disabled={data.value?.disableCheck} key={data.value?.id} modelValue={data.value?.checked} onUpdate:modelValue={() => {
                toggleCheckNode(data.value);
              }} onClick={(event: MouseEvent) => {
                event.stopPropagation();
              }} /> }
              <span class={['devui-tree-node__title', data.value?.disableSelect && 'select-disabled']}>{data.value?.label}</span>
            </div>
          </div>
        </div>
      );
    };
  },
});

import { defineComponent, inject, PropType, renderSlot, toRefs, useSlots } from 'vue';
import { NODE_HEIGHT, USE_TREE_TOKEN } from '../const';
import { IInnerTreeNode } from '../core/use-tree-types';
import DTreeNodeToggle from './tree-node-toggle';
import { Checkbox } from '../../../checkbox';
import DTreeNodeContent from './tree-node-content';
import useTreeNode from './use-tree-node';

export default defineComponent({
  name: 'DTreeNode',
  props: {
    data: {
      type: Object as PropType<IInnerTreeNode>,
    },
  },
  setup(props, { slots }) {
    const { data } = toRefs(props);
    const { selectNode, toggleCheckNode, toggleNode } = inject(USE_TREE_TOKEN);

    const {
      nodeClass,
      nodeStyle,
      nodeContentClass,
      nodeVLineClass,
      nodeVLineStyle,
      nodeHLineClass,
    } = useTreeNode(data);

    return () => {
      return (
        <div class={nodeClass.value} style={nodeStyle.value}>
          <span class={nodeVLineClass.value} style={nodeVLineStyle.value}></span>
          <div class={nodeContentClass.value} onClick={() => { selectNode(data.value); }}>
            <span class={nodeHLineClass.value}></span>
            {
              slots.icon
              ? renderSlot(useSlots(), 'icon', { nodeData: data, toggleNode })
              : <DTreeNodeToggle data={data.value} />
            }
            <div class="devui-tree-node__content--value-wrapper" style={{ height: `${NODE_HEIGHT}px`}}>
              <Checkbox
                key={data.value?.id}
                disabled={data.value?.disableCheck}
                modelValue={data.value?.checked}
                onUpdate:modelValue={() => { toggleCheckNode(data.value); }}
                onClick={(event: MouseEvent) => { event.stopPropagation(); }}
              />
              {
                slots.default
                ? renderSlot(useSlots(), 'default', { nodeData: data })
                : <DTreeNodeContent data={data} />
              }
            </div>
          </div>
        </div>
      );
    };
  },
});

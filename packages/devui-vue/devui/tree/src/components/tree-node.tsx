import { defineComponent, inject, PropType, toRefs } from 'vue';
import { NODE_HEIGHT, USE_TREE_TOKEN } from '../const';
import { IInnerTreeNode } from '../core/use-tree-types';
import DTreeNodeToggle from './tree-node-toggle';
import { Checkbox } from '../../../checkbox';
import useTreeNode from './use-tree-node';

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

    const {
      nodeClass,
      nodeStyle,
      nodeContentClass,
      nodeTitleClass,
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
            <DTreeNodeToggle data={data.value} />
            <div class="devui-tree-node__content--value-wrapper" style={{ height: `${NODE_HEIGHT}px`}}>
              <Checkbox
                key={data.value?.id}
                disabled={data.value?.disableCheck}
                modelValue={data.value?.checked}
                onUpdate:modelValue={() => { toggleCheckNode(data.value); }}
                onClick={(event: MouseEvent) => { event.stopPropagation(); }}
              />
              <span class={nodeTitleClass.value}>{data.value?.label}</span>
            </div>
          </div>
        </div>
      );
    };
  },
});

import type { ComputedRef } from 'vue';
import { computed, defineComponent, inject, PropType, renderSlot, toRefs, useSlots } from 'vue';
import { NODE_HEIGHT, USE_TREE_TOKEN } from '../const';
import { IInnerTreeNode, IUseTree } from '../composables/use-tree-types';
import DTreeNodeToggle from './tree-node-toggle';
import { Checkbox } from '../../../checkbox';
import DTreeNodeContent from './tree-node-content';
import useTreeNode from './use-tree-node';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DTreeNode',
  props: {
    data: {
      type: Object as PropType<IInnerTreeNode>,
      default: () => ({}),
    },
    check: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const { data, check } = toRefs(props);
    const { toggleSelectNode, toggleCheckNode, toggleNode, getChildren } = inject(USE_TREE_TOKEN) as Partial<IUseTree>;
    const ns = useNamespace('tree');

    const { nodeClass, nodeStyle, nodeContentClass, nodeVLineClass, nodeVLineStyle, nodeHLineClass } = useTreeNode(
      data as ComputedRef<IInnerTreeNode>
    );

    const halfChecked = computed(() => {
      const children = getChildren?.(data.value);
      const checkedChildren = children?.filter((item: IInnerTreeNode) => item.checked);

      if (['upward', 'both'].includes(check.value)) {
        return checkedChildren.length > 0 && checkedChildren.length < children.length;
      } else {
        return false;
      }
    });

    return () => {
      const checkboxProps = {
        key: data.value?.id,
        disabled: data.value?.disableCheck,
        halfchecked: halfChecked.value,
        modelValue: data.value?.checked,
        'onUpdate:modelValue': () => {
          toggleCheckNode(data.value);
        },
        onClick: (event: MouseEvent) => {
          event.stopPropagation();
        },
      };
      return (
        <div class={nodeClass.value} style={nodeStyle.value}>
          <span class={nodeVLineClass.value} style={nodeVLineStyle.value}></span>
          <div
            class={nodeContentClass.value}
            onClick={() => {
              toggleSelectNode(data.value);
            }}>
            <span class={nodeHLineClass.value}></span>
            {slots.icon ? renderSlot(useSlots(), 'icon', { nodeData: data, toggleNode }) : <DTreeNodeToggle data={data.value} />}
            <div class={ns.em('node-content', 'value-wrapper')} style={{ height: `${NODE_HEIGHT}px` }}>
              {check.value && <Checkbox {...checkboxProps} />}
              {slots.default ? renderSlot(useSlots(), 'default', { nodeData: data }) : <DTreeNodeContent data={data} />}
            </div>
          </div>
        </div>
      );
    };
  },
});

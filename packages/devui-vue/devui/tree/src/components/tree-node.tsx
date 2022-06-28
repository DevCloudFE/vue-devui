import type { ComputedRef, PropType } from 'vue';
import { ref, computed, defineComponent, inject, renderSlot, toRefs, useSlots } from 'vue';
import { NODE_HEIGHT, TREE_INSTANCE, USE_TREE_TOKEN } from '../const';
import { IInnerTreeNode, IUseTree, ICheck, IOperate } from '../composables/use-tree-types';
import DTreeNodeToggle from './tree-node-toggle';
import { Checkbox } from '../../../checkbox';
import DTreeNodeContent from './tree-node-content';
import useTreeNode from './use-tree-node';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { formatCheckStatus } from '../utils';

export default defineComponent({
  name: 'DTreeNode',
  props: {
    data: {
      type: Object as PropType<IInnerTreeNode>,
      default: () => ({}),
    },
    check: {
      type: [Boolean, String] as PropType<ICheck>,
      default: false,
    },
    operate: {
      type: [Boolean, String, Array] as PropType<IOperate>,
      default: false,
    },
  },
  setup(props, { slots }) {
    const { data, check, operate } = toRefs(props);
    const {
      toggleSelectNode,
      toggleCheckNode,
      toggleNode,
      getChildren,
      insertBefore,
      removeNode
    } = inject(USE_TREE_TOKEN) as Partial<IUseTree>;
    const treeInstance = inject(TREE_INSTANCE);
    const ns = useNamespace('tree');

    const {
      nodeClass,
      nodeStyle,
      nodeContentClass,
      nodeVLineClass,
      nodeVLineStyles,
      nodeHLineClass,
      nodeOperationAreaClass
    } = useTreeNode(
      data as ComputedRef<IInnerTreeNode>
    );

    const halfChecked = computed(() => {
      if (!data.value?.checked) {
        return false;
      }
      const checkFormat = formatCheckStatus(check.value);
      if (['upward', 'both'].includes(checkFormat)) {
        const children = getChildren?.(data.value) || [];
        const checkedChildren = children?.filter((item: IInnerTreeNode) => item.checked);
        return checkedChildren.length > 0 && checkedChildren.length < children.length;
      } else {
        return false;
      }
    });

    const checkboxProps = {
      key: data.value?.id,
      disabled: data.value?.disableCheck,
      halfChecked: halfChecked.value,
      modelValue: data.value?.checked,
      'onUpdate:modelValue': () => {
        toggleCheckNode?.(data.value);
      },
      onClick: (event: MouseEvent) => {
        event.stopPropagation();
      },
    };

    const isShowOperationArea = ref(false);

    const showOperationArea = () => {
      isShowOperationArea.value = true;
    };

    const hideOperationArea = () => {
      isShowOperationArea.value = false;
    };

    return () => {
      return (
        <div
          class={nodeClass.value}
          style={nodeStyle.value}
          onMouseenter={showOperationArea}
          onMouseleave={hideOperationArea}
        >
          {nodeVLineStyles.value.map((item) => (
            <span class={nodeVLineClass.value} style={item}></span>
          ))}
          <div
            class={nodeContentClass.value}
            onClick={() => {
              toggleSelectNode?.(data.value);
              treeInstance.emit('node-click', data.value);
            }}>
            <span class={nodeHLineClass.value}></span>
            {slots.icon ? renderSlot(useSlots(), 'icon', { nodeData: data, toggleNode }) : <DTreeNodeToggle data={data.value} />}
            <div class={ns.em('node-content', 'value-wrapper')} style={{ height: `${NODE_HEIGHT}px` }}>
              {check.value && <Checkbox {...checkboxProps} />}
              {slots.default ? renderSlot(useSlots(), 'default', { nodeData: data }) : <DTreeNodeContent data={data.value} />}
            </div>
            {
              operate.value && isShowOperationArea.value &&
              <div class={nodeOperationAreaClass.value}>
                <d-icon name="add" onClick={() => {
                  insertBefore(data.value, { label: '新节点' });
                }}></d-icon>
                <d-icon name="delete" onClick={() => {
                  removeNode(data.value);
                }}></d-icon>
              </div>
            }
          </div>
        </div>
      );
    };
  },
});

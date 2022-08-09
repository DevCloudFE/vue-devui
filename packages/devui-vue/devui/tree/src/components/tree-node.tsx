import type { ComputedRef, ComponentInternalInstance } from 'vue';
import { getCurrentInstance, ref, computed, defineComponent, inject, renderSlot, toRefs, useSlots } from 'vue';
import { NODE_HEIGHT, TREE_INSTANCE, USE_TREE_TOKEN } from '../const';
import { treeNodeProps, TreeNodeProps } from '../tree-types';
import { IInnerTreeNode, IUseTree, useTreeNode } from '../composables';
import DTreeNodeToggle from './tree-node-toggle';
import DTreeNodeLoading from './tree-node-loading';
import { Checkbox } from '../../../checkbox';
import DTreeNodeContent from './tree-node-content';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { omit } from '../../../shared/utils';
import { formatCheckStatus } from '../utils';
import { createI18nTranslate } from '../../../locale/create';

export default defineComponent({
  name: 'DTreeNode',
  props: treeNodeProps,
  setup(props: TreeNodeProps, { slots }) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DTree', app);

    const { data, check, dragdrop, operate } = toRefs(props);
    const {
      toggleSelectNode,
      toggleCheckNode,
      toggleNode,
      getChildren,
      insertBefore,
      removeNode,
      getNode,
      onDragstart,
      onDragover,
      onDragleave,
      onDrop,
      onDragend,
    } = inject(USE_TREE_TOKEN) as Partial<IUseTree>;
    const treeInstance = inject(TREE_INSTANCE) as ComponentInternalInstance | null;
    const ns = useNamespace('tree');

    const { nodeClass, nodeStyle, nodeContentClass, nodeVLineClass, nodeVLineStyles, nodeHLineClass, nodeOperationAreaClass } = useTreeNode(
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

    const checkboxProps = computed(() => {
      return {
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
    });

    const isShowOperationArea = ref(false);

    const showOperationArea = () => {
      isShowOperationArea.value = true;
    };

    const hideOperationArea = () => {
      isShowOperationArea.value = false;
    };

    return () => {
      let dragdropProps = {};
      if (dragdrop.value && !data.value?.disableSelect) {
        dragdropProps = {
          draggable: true,
          onDragstart: (event: DragEvent) => onDragstart?.(event, data.value),
          onDragover: (event: DragEvent) => onDragover?.(event),
          onDragleave: (event: DragEvent) => onDragleave?.(event),
          onDrop: (event: DragEvent) => onDrop?.(event, data.value),
          onDragend: (event: DragEvent) => onDragend?.(event),
        };
      }
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
          <span class={nodeHLineClass.value} style={omit(nodeVLineStyles.value[0], ['height', 'top'])}></span>
          <div
            class={nodeContentClass.value}
            onClick={() => {
              toggleSelectNode?.(data.value);
              treeInstance?.emit('node-click', data.value);
            }}
            {...dragdropProps}
          >
            {slots.icon ? renderSlot(useSlots(), 'icon', { nodeData: data, toggleNode }) : <DTreeNodeToggle data={data.value} />}
            <div class={ns.em('node-content', 'value-wrapper')} style={{ height: `${NODE_HEIGHT}px` }}>
              {check.value && <Checkbox {...checkboxProps.value} />}
              {slots.default ? renderSlot(useSlots(), 'default', { nodeData: data }) : <DTreeNodeContent data={data.value} />}
              {getNode?.(data.value)?.loading ? slots.loading ? renderSlot(useSlots(), 'loading') : <DTreeNodeLoading /> : ''}
              {dragdrop.value && (
                <>
                  <div class={ns.em('node', 'drop-top')} />
                  <div class={ns.em('node', 'drop-bottom')} />
                  <div class={ns.em('node', 'drop-left')} />
                  <div class={ns.em('node', 'drop-right')} />
                </>
              )}
            </div>
            {operate.value && isShowOperationArea.value && (
              <div class={nodeOperationAreaClass.value}>
                <d-icon
                  name="add"
                  onClick={() => {
                    insertBefore?.(data.value, { label: t('newNode') || 'New node' });
                  }}
                />
                <d-icon
                  name="delete"
                  onClick={() => {
                    removeNode?.(data.value);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      );
    };
  },
});

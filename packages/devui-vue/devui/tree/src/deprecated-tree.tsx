import { defineComponent, reactive, ref, toRefs, provide } from 'vue';
import type { SetupContext } from 'vue';
import { treeProps, TreeProps, TreeItem, TreeRootType, Nullable } from './deprecated-tree-types';
import { CHECK_CONFIG } from './config';
import { preCheckTree, deleteNode, getId } from './utils';
import Loading from '../../loading/src/loading-service';
import Checkbox from '../../checkbox/src/checkbox';
import useToggle from './deprecated-composables/use-toggle';
import useMergeNode from './deprecated-composables/use-merge-node';
import useHighlightNode from './deprecated-composables/use-highlight';
import useChecked from './deprecated-composables/use-checked';
import useLazy from './deprecated-composables/use-lazy';
import useOperate from './deprecated-composables/use-operate';
import useDraggable from './deprecated-composables/use-draggable';
import { IconOpen } from './components/icon-open';
import { IconClose } from './components/icon-close';
import NodeContent from './tree-node-content';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './tree.scss';

export default defineComponent({
  name: 'DTree',
  props: treeProps,
  emits: ['nodeSelected'],
  setup(props: TreeProps, ctx: SetupContext) {
    const { data, checkable, draggable, dropType, checkableRelation: cbr } = toRefs(reactive({ ...props, data: preCheckTree(props.data) }));
    const node = ref<Nullable<HTMLElement>>(null);
    const { mergeData } = useMergeNode(data);
    const { openedData, toggle } = useToggle(mergeData);
    const { nodeClassNameReflect, handleInitNodeClassNameReflect, handleClickOnNode } = useHighlightNode();
    const { lazyNodesReflect, handleInitLazyNodeReflect, getLazyData } = useLazy();
    const { selected, onNodeClick } = useChecked(cbr, ctx, data.value);
    const { editStatusReflect, operateIconReflect, handleReflectIdToIcon } = useOperate(data);
    const { onDragstart, onDragover, onDragleave, onDrop } = useDraggable(draggable.value, dropType.value, node, openedData, data);
    provide<TreeRootType>('treeRoot', { ctx, props });
    const ns = useNamespace('tree');

    const renderNode = (item: TreeItem) => {
      const { id = '', disabled, open, isParent, level, children, addable, editable, deletable } = item;
      handleReflectIdToIcon(id, {
        addable,
        editable,
        deletable,
        handleAdd: () => {
          const newItem: TreeItem = {
            id: getId(item.id),
            label: 'new item',
            level: item.level + 1,
            addable,
            editable,
            deletable,
          };
          item.open = true;
          if (item.children && Array.isArray(item.children)) {
            item.children.push(newItem);
          } else {
            item.children = [newItem];
          }
        },
        handleEdit: () => {
          editStatusReflect.value[id] = !editStatusReflect.value[id];
        },
        handleDelete: () => {
          mergeData.value = deleteNode(id, mergeData.value);
        },
      });
      handleInitNodeClassNameReflect(disabled, id);
      handleInitLazyNodeReflect(item, {
        id,
        onGetNodeData: async () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                {
                  id: `It is a test Node-1 ID = ${id}`,
                  label: `It is a test Node-1 ID = ${id}`,
                  level: item.level + 1,
                },
                {
                  id: `It is a test Node-2 ID = ${id}`,
                  label: `It is a test Node-2 ID = ${id}`,
                  level: item.level + 1,
                },
              ]);
            }, 4000);
          });
        },
        renderLoading: (elementId) => {
          return Loading.open({
            target: document.getElementById(elementId),
            message: '加载中...',
            positionType: 'relative',
            zIndex: 1,
          });
        },
      });
      const renderFoldIcon = (treeItem: TreeItem) => {
        const handleClick = async (target: MouseEvent) => {
          if (treeItem.isParent) {
            treeItem.children = await getLazyData(id); // treeItem 按引用传递
          }
          return toggle(target, treeItem);
        };
        return (
          <div class={ns.e('node-folder')} onClick={handleClick}>
            {isParent || (children && children.length) ? (
              open ? (
                <IconOpen class="mr-xs" />
              ) : (
                <IconClose class="mr-xs" />
              )
            ) : (
              <span class={ns.e('node-indent')} />
            )}
          </div>
        );
      };
      const checkState = CHECK_CONFIG[selected.value[id] ?? 'none'];
      return (
        <div
          class={[ns.e('node'), open && ns.em('node', 'open')]}
          style={{ paddingLeft: `${24 * (level - 1)}px` }}
          draggable={draggable.value}
          onDragstart={(event: DragEvent) => onDragstart(event, item)}
          onDragover={(event: DragEvent) => onDragover(event, item)}
          onDragleave={(event: DragEvent) => onDragleave(event)}
          onDrop={(event: DragEvent) => onDrop(event, item)}>
          <div class={[ns.e('node-content'), nodeClassNameReflect.value[id]]} onClick={() => handleClickOnNode(id)}>
            {renderFoldIcon(item)}
            <div class={[ns.em('node-content', 'value-wrapper'), draggable && ns.e('drop-draggable')]}>
              {checkable.value && <Checkbox key={id} onClick={() => onNodeClick(item)} disabled={disabled} {...checkState} />}
              <NodeContent node={item} editStatusReflect={editStatusReflect.value} />
              {operateIconReflect.value.find(({ id: d }) => id === d).renderIcon(item)}
              {item.isParent ? <div class={ns.e('node-loading')} id={lazyNodesReflect.value[id].loadingTargetId} /> : null}
            </div>
          </div>
        </div>
      );
    };
    return () => {
      return <div class={ns.b()}>{openedData.value.map((item) => renderNode(item))}</div>;
    };
  },
});

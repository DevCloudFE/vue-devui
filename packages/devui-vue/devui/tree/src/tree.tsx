import { defineComponent, reactive, ref, toRefs, provide, unref } from 'vue'
import type { SetupContext } from 'vue'
import { treeProps, TreeProps, TreeItem, TreeRootType, Nullable } from './tree-types'
import { CHECK_CONFIG } from  './config'
import { preCheckTree, deleteNode, getId } from './util'
import Loading from '../../loading/src/service'
import Checkbox from '../../checkbox/src/checkbox'
import useToggle from './composables/use-toggle'
import useMergeNode from './composables/use-merge-node'
import useHighlightNode from './composables/use-highlight'
import useChecked from './composables/use-checked'
import useLazy from './composables/use-lazy'
import useOperate from './composables/use-operate'
import useDraggable from './composables/use-draggable'
import IconOpen from './assets/open.svg'
import IconClose from './assets/close.svg'
import NodeContent from './tree-node-content'
import './tree.scss'

export default defineComponent({
  name: 'DTree',
  props: treeProps,
  emits: ['nodeSelected'],
  setup(props: TreeProps, ctx: SetupContext) {
    const { data, checkable, draggable, dropType, checkableRelation: cbr } = toRefs(reactive({ ...props, data: preCheckTree(props.data) }))
    const node = ref<Nullable<HTMLElement>>(null)
    const { mergeData } = useMergeNode(data)
    const { openedData, toggle } = useToggle(mergeData)
    const { nodeClassNameReflect, handleInitNodeClassNameReflect, handleClickOnNode } = useHighlightNode()
    const { lazyNodesReflect, handleInitLazyNodeReflect, getLazyData } = useLazy()
    const { selected, onNodeClick } = useChecked(cbr, ctx, data.value)
    const { editStatusReflect, operateIconReflect, handleReflectIdToIcon } = useOperate(data)
    const { onDragstart, onDragover, onDragleave, onDrop } = useDraggable(draggable.value, dropType.value, node, openedData, data);
    provide<TreeRootType>('treeRoot', { ctx, props })

    const renderNode = (item: TreeItem) => {
      const { id = '', disabled, open, isParent, level, children, addable, editable, deletable } = item  
      handleReflectIdToIcon(
        id,
        {
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
              deletable
            }
            item.open = true
            if (item.children && Array.isArray(item.children)) {
              item.children.push(newItem)
            } else {
              item.children = [newItem]
            }
          },
          handleEdit: () => {
            editStatusReflect.value[id] = !editStatusReflect.value[id]
          },
          handleDelete: () => {
            mergeData.value = deleteNode(id, mergeData.value)
          },
        }
      )
      handleInitNodeClassNameReflect(disabled, id)
      handleInitLazyNodeReflect(item, {
        id,
        onGetNodeData: async () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                {
                  id: `It is a test Node-1 ID = ${id}`,
                  label: `It is a test Node-1 ID = ${id}`,
                  level: item.level + 1
                }, {
                  id: `It is a test Node-2 ID = ${id}`,
                  label: `It is a test Node-2 ID = ${id}`,
                  level: item.level + 1
                }
              ])
            }, 4000)
          })
        },
        renderLoading: (id) => {
          return Loading.open({
            target: document.getElementById(id),
            message: '加载中...',
            positionType: 'relative',
            zIndex: 1,
          })
        }
      })
      const renderFoldIcon = (item: TreeItem) => {
        const handleClick = async (target: MouseEvent) => {
          if (item.isParent) {
            item.children = await getLazyData(id)  // item 按引用传递
          }
          return toggle(target, item)
        }
        return (
          <div class="devui-tree-node__folder" onClick={handleClick} >
            {
              isParent || children && children.length
              ? open
                ? <IconOpen class="mr-xs" />
                : <IconClose class="mr-xs" />
              : <span class="devui-tree-node__indent" /> 
            }
          </div>
          
        )
      }
      const checkState = CHECK_CONFIG[selected.value[id] ?? 'none']
      return (
        <div
          class={['devui-tree-node', open && 'devui-tree-node__open']}
          style={{ paddingLeft: `${24 * (level - 1)}px` }}
          draggable={draggable.value}
          onDragstart={(event: DragEvent) => onDragstart(event, item)}
          onDragover={(event: DragEvent) => onDragover(event, item)}
          onDragleave={(event: DragEvent) => onDragleave(event)}
          onDrop={(event: DragEvent) => onDrop(event, item)}
        >
          <div
            class={`devui-tree-node__content ${nodeClassNameReflect.value[id]}`}
            onClick={() => handleClickOnNode(id)}
          >
            { renderFoldIcon(item) }
            <div class={['devui-tree-node__content--value-wrapper', draggable && 'devui-drop-draggable']}>
              { checkable.value && <Checkbox key={id} onClick={() => onNodeClick(item)} disabled={disabled} {...checkState} /> }
              <NodeContent node={item} editStatusReflect={editStatusReflect.value} />
              { operateIconReflect.value.find(({ id: d }) => id === d).renderIcon(item) }
              {
                item.isParent
                  ? <div class='devui-tree-node_loading' id={lazyNodesReflect.value[id].loadingTargetId} />
                  : null
              }
            </div>
          </div>
        </div>
      )
    }
    return () => {
      return (
        <div class="devui-tree">
          { openedData.value.map(item => renderNode(item)) }
        </div>
      )
    }
  }
})

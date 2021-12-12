import { defineComponent, reactive, toRefs, provide } from 'vue'
import type { SetupContext } from 'vue'
import { treeProps, TreeProps, TreeItem, TreeRootType } from './tree-types'
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
import IconOpen from './assets/open.svg'
import IconClose from './assets/close.svg'
import NodeContent from './tree-node-content'
import './tree.scss'

export default defineComponent({
  name: 'DTree',
  props: treeProps,
  emits: ['nodeSelected'],
  setup(props: TreeProps, ctx: SetupContext) {
    const { data, checkable, checkableRelation: cbr } = toRefs(reactive({ ...props, data: preCheckTree(props.data) }))
    const { mergeData } = useMergeNode(data.value)
    const { openedData, toggle } = useToggle(mergeData)
    const { nodeClassNameReflect, handleInitNodeClassNameReflect, handleClickOnNode } = useHighlightNode()
    const { lazyNodesReflect, handleInitLazyNodeReflect, getLazyData } = useLazy()
    const { selected, onNodeClick } = useChecked(cbr, ctx, data.value)
    const { editStatusReflect, operateIconReflect, handleReflectIdToIcon } = useOperate(data)

    provide<TreeRootType>('treeRoot', { ctx, props })
    const Indent = () => {
      return <span style="display: inline-block; width: 16px; height: 16px; margin-left: 8px;"></span>
    }
    const renderNode = (item: TreeItem) => {
      const { id = '', label, disabled, open, isParent, level, children, addable, editable, deletable } = item
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
          isParent || children && children.length
          ? open
            ? <IconOpen class="mr-xs" onClick={handleClick} />
            : <IconClose class="mr-xs" onClick={handleClick} />
          : <Indent />
        )
      }
      const checkState = CHECK_CONFIG[selected.value[id] ?? 'none']
      return (
        <div
          class={['devui-tree-node', open && 'devui-tree-node__open']}
          style={{ paddingLeft: `${24 * (level - 1)}px` }}
        >
          <div
            class={`devui-tree-node__content ${nodeClassNameReflect.value[id]}`}
            onClick={() => handleClickOnNode(id)}
          >
            <div class="devui-tree-node__content--value-wrapper">
              { renderFoldIcon(item) }
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
    const renderTree = (tree) => {
      return tree.map(item => {
        if (!item.children) {
          return renderNode(item)
        } else {
          return (
            <>
              {renderNode(item)}
              {renderTree(item.children)}
            </>
          )
        }
      })
    }
    return () => {
      return (
        <div class="devui-tree">
          {/* { renderTree(data.value) } */}
          { openedData.value.map(item => renderNode(item)) }
        </div>
      )
    }
  }
})

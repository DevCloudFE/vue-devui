import { defineComponent, toRefs, provide, ref,  unref } from 'vue'
import { treeProps, TreeProps, TreeItem, TreeRootType, SelectType, ReverseTree } from './tree-types'
import { CHECK_CONFIG } from  './config';
import { flatten, precheckTree } from './util'
import Loading from '../../loading/src/service'
import Checkbox from '../../checkbox/src/checkbox'
import useToggle from './composables/use-toggle'
import useMergeNode from './composables/use-merge-node'
import useHighlightNode from './composables/use-highlight'
import useLazy from './composables/use-lazy'
import IconOpen from './assets/open.svg'
import IconClose from './assets/close.svg'
import NodeContent from './tree-node-content'
import './tree.scss'

export default defineComponent({
  name: 'DTree',
  props: treeProps,
  emits: ['nodeSelected'],
  setup(props: TreeProps, ctx) {
    const { data, checkable, checkableRelation: cbr } = toRefs({ ...props, data: precheckTree(props.data) })
    const flatData = flatten(data.value)
    const selected = ref<SelectType>({})

    const { mergeData } = useMergeNode(data.value)
    const { openedData, toggle } = useToggle(mergeData.value)
    const { nodeClassNameReflect, handleInitNodeClassNameReflect, handleClickOnNode } = useHighlightNode()
    const { lazyNodesReflect, handleInitLazyNodeReflect, getLazyData } = useLazy()

    provide<TreeRootType>('treeRoot', { ctx, props });
    const Indent = () => {
      return <span style="display: inline-block; width: 16px; height: 16px; margin-left: 8px"></span>
    }

    const findPedigreeById = (id: string) => {
      const treeData = unref(data)
      let parentLevel: ReverseTree = {}
      let childLevel: string[] = []
      let target = undefined
      const ergodic = (curr: any[], parentNode: ReverseTree) => {
        curr.every(({ children, id: itemId }) => {
          if (target) {
            return false
          }
          if (itemId === id) {
            parentLevel = parentNode
            childLevel = Array.isArray(children)
              ? flatten(children).map(({ id: key }) => key)
              : [];
            target = itemId
            return false
          }
          if (Array.isArray(children)) {
            ergodic(children, {
              id: itemId,
              children: children.map(({ id: key }) => key),
              parent: parentNode,
            });
          }
          return true
        })
      }
      ergodic(treeData, {})
      return {
        parentLevel,
        childLevel,
      }
    }

    const generateParentObject = (parentLevel: ReverseTree, isSelected: boolean, checkId: string): SelectType => {
      const state: SelectType = {}
      const currentSelected = unref(selected)
      const ergodic = (currObj: ReverseTree, isOverflow = false) => {
        const { id, children, parent } = currObj;
        if (!parent) {
          return
        }
        if (isSelected) {
          const optional = children.filter(
            (item) => !currentSelected[item] || currentSelected[item] === 'none'
          );
          if (optional.length <= 1) {
            if (optional[0] === checkId) {
              state[id] = 'select'
            } else if (isOverflow) {
              state[id] = 'half'
            }
          } else {
            state[id] = 'half'
          }
          ergodic(parent, state[id] === 'select');
        } else {
          const optional = children.filter(
            (item) => currentSelected[item] && currentSelected[item] !== 'none'
          );
          if (optional.length <= 1) {
            if (optional[0] === checkId || isOverflow) {
              state[id] = 'none'
            }
          } else {
            state[id] = 'half'
          }
          ergodic(parent, state[id] === 'none')
        }
      }
      ergodic(parentLevel)
      return state
    }

    const onNodeClick = (item: TreeItem) => {
      const { id } = item
      let currentSelected = Object.assign({}, unref(selected))
      const isSelected = currentSelected[id] === 'none' || !currentSelected[id];
      if (cbr.value === 'none') {
        currentSelected = Object.assign(currentSelected, { [id]: isSelected ? 'select' : 'none' })
      } else if (cbr.value === 'both') {
        const { parentLevel, childLevel } = findPedigreeById(id);
        currentSelected = Object.assign(
          currentSelected,
          Object.fromEntries(
            childLevel.map((key) => [
              key,
              isSelected ? 'select' : 'none',
            ])
          ),
          generateParentObject(parentLevel, isSelected, id),
          { [id]: isSelected ? 'select' : 'none' }
        )
      } else if (cbr.value === 'upward') {
        const { parentLevel } = findPedigreeById(id);
        currentSelected = Object.assign(
          currentSelected,
          generateParentObject(parentLevel, isSelected, id),
          { [id]: isSelected ? 'select' : 'none' }
        )
      } else if (cbr.value === 'downward') {
        const { childLevel } = findPedigreeById(id);
        currentSelected = Object.assign(
          currentSelected,
          Object.fromEntries(
            childLevel.map((key) => [
              key,
              isSelected ? 'select' : 'none',
            ])
          ),
          { [id]: isSelected ? 'select' : 'none' }
        )
      }
      selected.value = currentSelected
      const currentSelectedItem = flatData.filter(
        ({ id }) => currentSelected[id] && currentSelected[id] !== 'none'
      )
      ctx.emit('nodeSelected', currentSelectedItem)
    }
    const renderNode = (item: TreeItem) => {
      const { id = '', label, disabled, open, isParent, level, children } = item
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
      const renderNodeWithIcon = (item: TreeItem) => {
        const handleClick = async (target: MouseEvent) => {
          if (item.isParent) {
            item.children = await getLazyData(id)  // item 按引用传递
          }
          return toggle(target, item)
        }
        return (
          isParent || children
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
              {renderNodeWithIcon(item)}
              {checkable.value && <Checkbox key={id} onClick={() => onNodeClick(item)} disabled={disabled} {...checkState} />}
              <NodeContent node={item}/>
              {item.isParent && <div class='devui-tree-node_loading' id={lazyNodesReflect.value[id].loadingTargetId} />}
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

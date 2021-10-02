import { defineComponent, toRefs } from 'vue'
import { treeProps, TreeProps } from './tree-types'
import { flatten } from './util'
import useToggle from './composables/use-toggle'
import useHighLightNode from './composables/use-highlight'
import IconOpen from './assets/open.svg'
import IconClose from './assets/close.svg'
import './tree.scss'

export default defineComponent({
  name: 'DTree',
  props: treeProps,
  emits: [],
  setup(props: TreeProps) {
    const { data } = toRefs(props)
    const flatData = flatten(data.value)

    const { openedData, toggle } = useToggle(data.value)
    const { nodeClassNameRefelct, handleInitNodeClassNameRefelct, handleClickOnNode } = useHighLightNode()

    const Indent = () => {
      return <span style="display: inline-block; width: 16px; height: 16px;"></span>
    }

    const renderNode = (item) => {
      // 现在数据里面没有 key , 未来做优化需要 key 值嘛? 
      const { key = '', label, disabled, open, level, children } = item
      const nodeId = handleInitNodeClassNameRefelct(disabled, key, label)
      return (
        <div
          class={['devui-tree-node', open && 'devui-tree-node__open']}
          style={{ paddingLeft: `${24 * (level - 1)}px` }}
        >
          <div
            class={`devui-tree-node__content ${nodeClassNameRefelct.value[nodeId]}`}
            onClick={() => handleClickOnNode(nodeId)}
          >
            <div class="devui-tree-node__content--value-wrapper">
              {
                children
                  ? open
                    ? <IconOpen class="mr-xs" onClick={(target) => toggle(target, item)} />
                    : <IconClose class="mr-xs" onClick={(target) => toggle(target, item)} />
                  : <Indent />
              }
              <span class={['devui-tree-node__title', disabled && 'select-disabled']}>
                { label }
              </span>
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

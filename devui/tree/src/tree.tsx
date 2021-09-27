import { defineComponent, toRefs } from 'vue'
import { treeProps, TreeProps } from './tree-types'
import { flatten } from './util'
import useToggle from './composables/use-toggle'
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

    const Indent = () => {
      return <span style="display: inline-block; width: 16px; height: 16px;"></span>
    }

    const renderNode = (item) => {
      return (
        <div
          class="devui-tree-node"
          style={{ paddingLeft: `${24 * (item.level - 1)}px` }}
          onClick={() => toggle(item)}
        >
          {
            item.children
              ? item.open ? <IconOpen class="mr-xs" /> : <IconClose class="mr-xs" />
              : <Indent />
          }
          { item.label }
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

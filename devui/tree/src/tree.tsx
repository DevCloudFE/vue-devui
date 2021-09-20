import { defineComponent, toRefs } from 'vue'
import { treeProps, TreeProps } from './tree-types'
import { flatten } from './util'
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

    const Indent = () => {
      return <span style="display: inline-block; width: 16px; height: 16px;"></span>
    }

  const renderNode = (item) => {
    return (
      <div class="devui-tree-node" style={{ paddingLeft: `${24 * (item.level - 1)}px` }}>
        { !item.isLeaf ? <IconOpen class="mr-xs" /> : <Indent /> }
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
          <div>直接渲染：</div>
          { renderTree(data.value) }
          <div>先把数据拍平再渲染：</div>
          { flatData.map(item => renderNode(item)) }
        </div>
      )
    }
  }
})

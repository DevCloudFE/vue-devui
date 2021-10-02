import { defineComponent, toRefs, unref } from 'vue'
import { treeProps, TreeProps } from './tree-types'
import { flatten } from './util'
import useToggle from './composables/use-toggle'
import useFormat from './composables/use-format'
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

    const { formatData } = useFormat(data.value);
    console.log(unref(formatData), 'formatData');
    
    const { openedData, toggle } = useToggle(formatData.value)

    const Indent = () => {
      return <span style="display: inline-block; width: 16px; height: 16px;"></span>
    }

    const renderNode = (item) => {
      return (
        <div
          class={['devui-tree-node', item.open && 'devui-tree-node__open']}
          style={{ paddingLeft: `${24 * (item.level - 1)}px` }}
          onClick={() => toggle(item)}
        >
          <div class="devui-tree-node__content">
            <div class="devui-tree-node__content--value-wrapper">
              {
                item.children
                  ? item.open ? <IconOpen class="mr-xs" /> : <IconClose class="mr-xs" />
                  : <Indent />
              }
              <span class="devui-tree-node__title">{ item.label }</span>
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

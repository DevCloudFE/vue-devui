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

    return () => {
      return (
        <div class="devui-tree">
          {
            flatData.map(item => (
              <div key={item.label} class="devui-tree-node" style={{ paddingLeft: `${24 * (item.level - 1)}px` }}>
                { !item.isLeaf ? <IconOpen class="mr-xs" /> : <Indent /> }
                {item.label}
              </div>
            ))
          }
        </div>
      )
    }
  }
})

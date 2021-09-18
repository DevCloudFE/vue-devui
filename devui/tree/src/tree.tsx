import { defineComponent, toRefs } from 'vue'
import { treeProps, TreeProps } from './tree-types'
import { flatten } from './util'
import './tree.scss'

export default defineComponent({
  name: 'DTree',
  props: treeProps,
  emits: [],
  setup(props: TreeProps) {
    const { data } = toRefs(props)
    const flatData = flatten(data.value)

    return () => {
      return (
        <div class="devui-tree">
          {
            flatData.map(item => (
              <div>{item.label}</div>
            ))
          }
        </div>
      )
    }
  }
})

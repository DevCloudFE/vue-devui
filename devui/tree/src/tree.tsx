import './tree.scss'

import { defineComponent, toRefs } from 'vue'
import { treeProps, TreeProps } from './tree-types'

export default defineComponent({
  name: 'DTree',
  props: treeProps,
  emits: [],
  setup(props: TreeProps, ctx) {
    const { data } = toRefs(props)
    console.log('data:', data, data.value)

    return () => {
      return <div class="d-tree">{
        data.value.map(item => {
          return <div>{item.label}</div>
        })
      }</div>
    }
  }
})

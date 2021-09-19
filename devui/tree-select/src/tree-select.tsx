import './tree-select.scss'

import { defineComponent } from 'vue'
import { treeSelectProps, TreeSelectProps } from './tree-select-types'

export default defineComponent({
  name: 'DTreeSelect',
  props: treeSelectProps,
  emits: [],
  setup(props: TreeSelectProps, ctx) {
    return {}
  },
  render() {
    const {} = this

    return <div class="d-tree-select"></div>
  }
})

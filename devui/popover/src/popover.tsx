import './popover.scss'

import { defineComponent } from 'vue'
import { popoverProps, PopoverProps } from './popover-types'

export default defineComponent({
  name: 'DPopover',
  props: popoverProps,
  emits: [],
  setup(props: PopoverProps, ctx) {
    return {}
  },
  render() {
    const {} = this

    return <div class="d-popover"></div>
  }
})

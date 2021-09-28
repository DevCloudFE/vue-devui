import './drawer.scss'

import { defineComponent } from 'vue'
import { drawerProps, DrawerProps } from './drawer-types'

export default defineComponent({
  name: 'DDrawer',
  props: drawerProps,
  emits: [],
  setup(props: DrawerProps, ctx) {
    return {}
  },
  render() {
    const {} = this

    return <div class="d-drawer"></div>
  }
})

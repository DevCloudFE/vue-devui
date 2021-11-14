import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'DrawerContainer',
  setup() {
    const visible = inject('visible')
    return { visible }
  },
  render() {
    const { visible } = this
    if (!visible) return null
    return <div>内容区域</div>
  }
})
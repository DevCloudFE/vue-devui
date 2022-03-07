import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'DrawerContainer',
  setup() {
    const visible = inject('visible')
    const destroyOnHide = inject('destroyOnHide')
    return { visible, destroyOnHide }
  },
  render() {
    const { visible, destroyOnHide } = this

    if (destroyOnHide.value && !visible) {
      return null
    }
    return <div>内容区域</div>
  }
})
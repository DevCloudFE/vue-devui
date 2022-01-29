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
    const visibleVal = this.visible ? 'visible' : 'hidden'
    return <div style={{ visibility : visibleVal }}>内容区域</div>
  }
})
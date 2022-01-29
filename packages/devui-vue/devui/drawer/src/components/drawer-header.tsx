import { defineComponent, ref, inject, computed } from 'vue'

import './drawer-header.scss'

export default defineComponent({
  name: 'DrawerHeader',
  emits: ['toggleFullScreen', 'close'],
  setup(props, ctx) {
    const isFullScreen = ref(false)

    const visible = inject('visible')
    const destroyOnHide = inject('destroyOnHide')

    const fullScreenClassName = computed(() =>  isFullScreen.value ? 'icon icon-minimize' : 'icon icon-maxmize')

    const handleFullScreen = (e) => {
      e.stopPropagation()
      isFullScreen.value = !isFullScreen.value
      ctx.emit('toggleFullScreen')
    }

    const handleDrawerClose = () => {
      ctx.emit('close')
    }

    return { fullScreenClassName, visible, handleFullScreen, handleDrawerClose, destroyOnHide }
  },
  render() {
    const { 
      handleFullScreen, handleDrawerClose, visible, 
      fullScreenClassName, destroyOnHide 
    } = this

    if (destroyOnHide.value && !visible) {
      return null
    }

    const visibleVal = visible ? 'visible' : 'hidden'

    return (
      <div class="devui-drawer-header" style= {{ visibility : visibleVal }}>
        <div class="devui-drawer-header-item">
          <span class="devui-drawer-header-item icon icon-more-operate" />
        </div>
        <div class="devui-drawer-header-item" onClick={handleFullScreen}>
          <span class={fullScreenClassName}/>
        </div>
        <div class="devui-drawer-header-item" onClick={handleDrawerClose}>
          <span class="icon icon-close" />
        </div>
      </div>
    )
  }
})

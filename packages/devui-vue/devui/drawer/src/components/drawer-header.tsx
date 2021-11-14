import { defineComponent, ref, inject, computed, onUnmounted } from 'vue'

import './drawer-header.scss'

export default defineComponent({
  name: 'DrawerHeader', // 头部
  emits: ['toggleFullScreen', 'close'],
  setup(props, ctx) {
    const isFullScreen = ref(false)

    const visible: boolean = inject('visible')

    const fullScreenClassName = computed(() =>  isFullScreen.value ? 'icon icon-minimize' : 'icon icon-maxmize')

    const handleFullScreen = (e) => {
      e.stopPropagation()
      isFullScreen.value = !isFullScreen.value
      ctx.emit('toggleFullScreen')
    }

    const handleDrawerClose = () => {
      ctx.emit('close')
    }

    return { fullScreenClassName, visible, handleFullScreen, handleDrawerClose, }
  },
  render() {
    const { handleFullScreen, handleDrawerClose, visible, fullScreenClassName } = this
    
    if (!visible) return null

    return (
      <div class="devui-drawer-header">
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

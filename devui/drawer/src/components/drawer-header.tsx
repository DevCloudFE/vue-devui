import './drawer-header.scss'

import { defineComponent, toRefs, ref, reactive } from 'vue'
import { drawerHeaderType, DrawerHeaderType } from './drawer-header-type';

export default defineComponent({
  name: 'DrawerHeader', // 头部
  props: drawerHeaderType,
  emits: ['toggleFullScreen', 'close'],
  setup(props: DrawerHeaderType, ctx) {
    const isFullScreen = ref<boolean>(false);

    const handleFullScreen = () => {
      isFullScreen.value = !isFullScreen.value;
      ctx.emit('toggleFullScreen');
    }

    const handleDrawerClose = () => {
      ctx.emit('close')
    }

    return { isFullScreen, handleFullScreen, handleDrawerClose }
  },
  render() {
    const { handleFullScreen, isFullScreen, handleDrawerClose } = this
    const fullScreen: string = isFullScreen ? 'icon icon-minimize' : 'icon icon-maxmize'

    return (
      <div class="devui-drawer-header">
        <div class="devui-drawer-header-item">
          <span title="More" class="devui-drawer-header-item icon icon-more-operate" />
        </div>
        <div class="devui-drawer-header-item" onClick={handleFullScreen}>
          {/* {
            isFullScreen.value ?
              <span title="Fullscreen" class="icon icon-maxmize" /> :
              <span title="Fullscreen" class="icon icon-minimize" />
          } */}
          <span title="Fullscreen" class={fullScreen}/>
        </div>
        <div class="devui-drawer-header-item" onClick={handleDrawerClose}>
          <span title="Closescreen" class="icon icon-close" />
        </div>
      </div>
    )
  }
})

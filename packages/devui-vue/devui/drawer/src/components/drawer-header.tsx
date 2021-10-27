import { defineComponent, ref } from 'vue'
import { drawerHeaderType, DrawerHeaderType } from './drawer-header-type';

import './drawer-header.scss'

export default defineComponent({
  name: 'DrawerHeader', // 头部
  props: drawerHeaderType,
  emits: ['toggleFullScreen', 'close'],
  setup(props: DrawerHeaderType, ctx) {
    const isFullScreen = ref<boolean>(false);

    const handleFullScreen = (e) => {
      e.stopPropagation();
      isFullScreen.value = !isFullScreen.value;
      ctx.emit('toggleFullScreen');
    }

    const handleDrawerClose = () => {
      ctx.emit('close')
    }

    return { isFullScreen, handleFullScreen, handleDrawerClose }
  },
  render() {
    const { handleFullScreen, handleDrawerClose } = this
    const isFullScreen: string = this.isFullScreen ? 'icon icon-minimize' : 'icon icon-maxmize'

    return (
      <div class="devui-drawer-header">
        <div class="devui-drawer-header-item">
          <span class="devui-drawer-header-item icon icon-more-operate" />
        </div>
        <div class="devui-drawer-header-item" onClick={handleFullScreen}>
          <span class={isFullScreen}/>
        </div>
        <div class="devui-drawer-header-item" onClick={handleDrawerClose}>
          <span class="icon icon-close" />
        </div>
      </div>
    )
  }
})

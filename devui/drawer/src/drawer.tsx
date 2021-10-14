import { defineComponent, ref, toRefs } from 'vue'
import { drawerProps, DrawerProps } from './drawer-types'

import DrawerHeader from './components/drawer-header'

import './drawer.scss'

export default defineComponent({
  name: 'DDrawer',
  props: drawerProps,
  emits: ['close', 'update:visible'],
  setup(props: DrawerProps, ctx) {
    const { width, visible } = toRefs(props); // 宽度
    const ZIndex = ref<number>(1000); // z-index
    const isFullScreen = ref(false);

    const fullScreenEvent = () => {
      isFullScreen.value = !isFullScreen.value;
    }

    const closeDrawer = () => {
      ctx.emit('update:visible', false);
      ctx.emit('close');
    }
    
    return {
      ZIndex,
      isFullScreen,
      width,
      visible,
      fullScreenEvent,
      closeDrawer, 
    };
  },
  render() {
    const zindex: number = this.ZIndex;
    const width: number = this.isFullScreen ? '100vw' : this.width;
    const fullScreenEvent: any = this.fullScreenEvent;
    const closeDrawer: any = this.closeDrawer;

    if (!this.visible) return;

    return (
      <div class="devui-drawer" style={{ zIndex: zindex }}>
        {/* 越后面的元素层级越高？ */}
        <div class="devui-overlay-backdrop" />
        <div class="devui-overlay-wrapper" >
          <div class="devui-drawer-nav" style={{ 'left': 0, 'width': width }}>
            <div class="devui-drawer-content">
              <DrawerHeader onToggleFullScreen={fullScreenEvent} onClose={ closeDrawer }/>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

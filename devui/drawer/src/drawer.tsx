import { defineComponent, ref, toRefs } from 'vue'
import { drawerProps, DrawerProps } from './drawer-types'

import DrawerHeader from './components/drawer-header'

import './drawer.scss'

export default defineComponent({
  name: 'DDrawer',
  props: drawerProps,
  emits: ['close'],
  setup(props: DrawerProps, ctx) {
    const { width } = toRefs(props); // 宽度
    const ZIndex = ref<number>(1000); // z-index
    const fullScreen = ref(false);

    const fullScreenEvent = () => {
      fullScreen.value = !fullScreen.value;
    }

    const closeDrawer = () => {
      ctx.emit('close');
    }
    
    return { ZIndex, fullScreen, width, fullScreenEvent, closeDrawer };
  },
  render() {
    const zindex: number = this.ZIndex;
    const fullScreen: boolean = this.fullScreen;
    const width: number = fullScreen ? '100vw' : this.width;
    const fullScreenEvent: any = this.fullScreenEvent;
    const closeDrawer: any = this.closeDrawer;

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

import { defineComponent, ref, toRefs, watch } from 'vue'
import { drawerProps, DrawerProps } from './drawer-types'

import DrawerHeader from './components/drawer-header'
import DrawerContainer from './components/drawer-container'

import './drawer.scss'

export default defineComponent({
  name: 'DDrawer',
  props: drawerProps,
  emits: ['close', 'update:visible', 'afterOpened'],
  setup(props: DrawerProps, { emit, slots }) {
    const { width, visible, zIndex, isCover, escKeyCloseable } = toRefs(props); // 宽度
    const isFullScreen = ref(false);

    const fullScreenEvent = () => {
      isFullScreen.value = !isFullScreen.value;
    }

    const closeDrawer = () => {
      emit('update:visible', false);
      emit('close');
    }

    const escCloseDrawer = (e) => {
      if (e.code === 'Escape') {
        emit('update:visible', false);
      }
    }

    watch(visible, (val) => {
      if (val) {
        emit('afterOpened');
      }
      if (escKeyCloseable && val) {
        document.addEventListener('keyup', escCloseDrawer);
      } else {
        document.removeEventListener('keyup', escCloseDrawer);
      }
    })    

    return {
      zIndex,
      isFullScreen,
      width,
      visible,
      slots,
      isCover,
      fullScreenEvent,
      closeDrawer, 
    };
  },
  render() {
    const zindex: number = this.zIndex;
    const width: number = this.isFullScreen ? '100vw' : this.width;
    const fullScreenEvent: any = this.fullScreenEvent;
    const closeDrawer: any = this.closeDrawer;
    const isCover: boolean = this.isCover;

    if (!this.visible) return;

    return (
      <div class="devui-drawer" style={{ zIndex: zindex }}>
        {/* TODO : 有遮罩层时才能点击关闭 onClick={ closeDrawer }*/}
        {isCover ? <div class="devui-overlay-backdrop"/>: ''}
        <div class="devui-overlay-wrapper" >
          <div class="devui-drawer-nav" style={{ 'left': 0, 'width': width }}>
            <div class="devui-drawer-content">
              <DrawerHeader onToggleFullScreen={fullScreenEvent} onClose={closeDrawer} />
              <div> { this.slots.default ? this.slots.default() : <DrawerContainer/>} </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

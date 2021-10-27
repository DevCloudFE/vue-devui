import { defineComponent, ref, toRefs, watch, computed } from 'vue'
import { drawerProps, DrawerProps } from './drawer-types'

import DrawerHeader from './components/drawer-header'
import DrawerContainer from './components/drawer-container'

import './drawer.scss'

export default defineComponent({
  name: 'DDrawer',
  props: drawerProps,
  emits: ['close', 'update:visible', 'afterOpened'],
  setup(props: DrawerProps, { emit, slots }) {
    const { width, visible, zIndex, isCover, escKeyCloseable, position } = toRefs(props); // 宽度
    const isFullScreen = ref(false);

    const navWidth = computed(() => isFullScreen.value ? '100vw' : width.value );
    const wrapperRight = computed(() => position.value === 'right' ? { 'right': width.value } : {} );

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
      navWidth,
      visible,
      slots,
      isCover,
      wrapperRight,
      fullScreenEvent,
      closeDrawer, 
    };
  },
  render() {
    const zindex: number = this.zIndex;
    const fullScreenEvent: any = this.fullScreenEvent;
    const closeDrawer: any = this.closeDrawer;
    const isCover: boolean = this.isCover;
    const wrapperRight: Record<string, unknown> = this.wrapperRight;

    if (!this.visible) return;

    return (
      <div class="devui-drawer" style={{ zIndex: zindex }} onClick={ closeDrawer }>
        {isCover ? <div class="devui-overlay-backdrop"/>: ''}
        <div class="devui-overlay-wrapper" style={ wrapperRight }>
          <div class="devui-drawer-nav" style={{ 'width': this.navWidth }}>
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

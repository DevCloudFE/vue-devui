import { defineComponent, ref, toRefs, watch, onUnmounted, Teleport, provide } from 'vue'
import { drawerProps, DrawerProps } from './drawer-types'

import DrawerHeader from './components/drawer-header'
import DrawerContainer from './components/drawer-container'
import DrawerBody from './components/drawer-body'

import DrawerService from './drawer-service';

export default defineComponent({
  name: 'DDrawer',
  props: drawerProps,
  emits: ['close', 'update:visible', 'afterOpened'],
  setup(props: DrawerProps, { emit, slots }) {
    const {
      width, visible, zIndex, isCover, escKeyCloseable, position,
      backdropCloseable,
    } = toRefs(props)
    const isFullScreen = ref(false)

    const fullScreenEvent = () => {
      isFullScreen.value = !isFullScreen.value
    }

    const closeDrawer = async () => {
      DrawerService.hide()
      const beforeHidden = props.beforeHidden;
      let result = (typeof beforeHidden === 'function' ? beforeHidden(): beforeHidden) ?? false;
      if (result instanceof Promise) {
        result = await result;
      }
      if (result) return;

      emit('update:visible', false)
      emit('close')
    }

    const escCloseDrawer = (e) => {
      if (e.code === 'Escape') {
        closeDrawer()
      }
    }

    watch(visible, (val) => {
      if (val) {
        emit('afterOpened')
        isFullScreen.value = false
      }
      if (escKeyCloseable && val) {
        document.addEventListener('keyup', escCloseDrawer)
      } else {
        document.removeEventListener('keyup', escCloseDrawer)
      }
    })

    provide('closeDrawer', closeDrawer)
    provide('zindex', zIndex)
    provide('isCover', isCover)
    provide('position', position)
    provide('width', width)
    provide('visible', visible)
    provide('isFullScreen', isFullScreen)
    provide('backdropCloseable', backdropCloseable)

    onUnmounted(() => {
      document.removeEventListener('keyup', escCloseDrawer)
    })

    return {
      isFullScreen,
      visible,
      slots,
      fullScreenEvent,
      closeDrawer,
    }
  },
  render() {
    const fullScreenEvent: any = this.fullScreenEvent
    const closeDrawer: any = this.closeDrawer

    if (!this.visible) return null

    return (
      <Teleport to="body">
        <DrawerBody>
          {this.slots.header ? this.slots.header() : 
            <DrawerHeader onToggleFullScreen={fullScreenEvent} onClose={closeDrawer} />
          }
          {this.slots.default ? this.slots.default() : <DrawerContainer />}
        </DrawerBody>
      </Teleport>
    )
  }
})

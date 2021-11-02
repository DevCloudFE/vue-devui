import { defineComponent, ref, toRefs, watch, onUnmounted, Teleport, provide } from 'vue'
import { drawerProps, DrawerProps } from './drawer-types'

import DrawerHeader from './components/drawer-header'
import DrawerContainer from './components/drawer-container'
import DrawerBody from './components/drawer-body'

export default defineComponent({
  name: 'DDrawer',
  props: drawerProps,
  emits: ['close', 'update:visible', 'afterOpened'],
  setup(props: DrawerProps, { emit, slots }) {
    const { width, visible, zIndex, isCover, escKeyCloseable, position } = toRefs(props) // 宽度
    const isFullScreen = ref(false)

    let fullScreenEvent = () => {
      isFullScreen.value = !isFullScreen.value
    }

    let closeDrawer = () => {
      emit('update:visible', false)
      emit('close')
    }

    let escCloseDrawer = (e) => {
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

    onUnmounted(() => {
      document.removeEventListener('keyup', escCloseDrawer)
    })
    
    console.log(fullScreenEvent)


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
        <DrawerBody isFullScreen={this.isFullScreen}>
          <DrawerHeader onToggleFullScreen={fullScreenEvent} onClose={closeDrawer} />
          <div> {this.slots.default ? this.slots.default() : <DrawerContainer />} </div>
        </DrawerBody>
      </Teleport>
    )
  }
})

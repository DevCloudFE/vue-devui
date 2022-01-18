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
    const {
      width, visible, zIndex, isCover, escKeyCloseable, position,
      backdropCloseable, destroyOnHide
    } = toRefs(props)
    const isFullScreen = ref(false)
    
    const fullscreen = () => {
      isFullScreen.value = !isFullScreen.value
    }

    const closeDrawer = async () => {
      const beforeHidden = props.beforeHidden;
      let result = (typeof beforeHidden === 'function' ? beforeHidden(): beforeHidden) ?? false;
      if (result instanceof Promise) {
        result = await result;
      }
      if (result) return;

      // BUG: this is not working when use service model
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
        // TODO: destroy-model should reset props, this function should be extracted
        if (destroyOnHide.value) {
          isFullScreen.value = false
        }
      }
      if (escKeyCloseable && val) {
        document.addEventListener('keyup', escCloseDrawer)
      } else {
        document.removeEventListener('keyup', escCloseDrawer)
      }
    })

    // TODO： need to handle these params again
    // 1. should be provided by params' value (eg: provide('closeDrawer', closeDrawer.value))
    // 2. which param should be provided 
    provide('closeDrawer', closeDrawer)
    provide('zindex', zIndex)
    provide('isCover', isCover)
    provide('position', position)
    provide('width', width)
    provide('visible', visible)
    provide('isFullScreen', isFullScreen)
    provide('backdropCloseable', backdropCloseable)
    provide('destroyOnHide', destroyOnHide)

    onUnmounted(() => {
      document.removeEventListener('keyup', escCloseDrawer)
    })

    return {
      isFullScreen,
      visible,
      slots,
      fullscreen,
      closeDrawer,
    }
  },
  render() {
    const { fullscreen, closeDrawer, visible, destroyOnHide } = this;
    if (destroyOnHide.value && !visible) {
      return null
    }

    const visibleVal = visible ? 'visible' : 'hidden'
    return (
      <Teleport to="body">
        <DrawerBody style= {{ visibility : visibleVal }}>
          {/* BUG: 已使用作用域插槽解决 此处对应的 DEMO 使用了 **双向绑定** 导致可以关闭【一种关闭了的'假象'】。*/}
          {this.slots.header ? this.slots.header({fullscreen, closeDrawer}) : 
            <DrawerHeader onToggleFullScreen={fullscreen} onClose={closeDrawer} />
          }
          {this.slots.content ? this.slots.content() : <DrawerContainer />}
        </DrawerBody>
      </Teleport>
    )
  }
})

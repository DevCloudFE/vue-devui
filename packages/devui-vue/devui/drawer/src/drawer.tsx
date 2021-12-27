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
      backdropCloseable,
    } = toRefs(props)
    const isFullScreen = ref(false)

    const fullScreen = () => {
      isFullScreen.value = !isFullScreen.value
    }

    const closeDrawer = async () => {
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
      fullScreen,
      closeDrawer,
    }
  },
  render() {
    const fullScreen: any = this.fullScreen
    const closeDrawer: any = this.closeDrawer

    if (!this.visible) return null

    return (
      <Teleport to="body">
        <DrawerBody>
          {/* BUG: 已使用作用域插槽解决
            头部被替换后无法执行下面 fullScreen 与 closeDrawer 
            此处对应的 DEMO 使用了 **双向绑定** 导致可以关闭【一种关闭了的'假象'】。
            因此没有执行关闭时可能需要执行的方法 beforeHidden 和 onclose
          */}
          {this.slots.header ? this.slots.header({fullScreen, closeDrawer}) : 
            <DrawerHeader onToggleFullScreen={fullScreen} onClose={closeDrawer} />
          }
          {this.slots.content ? this.slots.content() : <DrawerContainer />}
        </DrawerBody>
      </Teleport>
    )
  }
})

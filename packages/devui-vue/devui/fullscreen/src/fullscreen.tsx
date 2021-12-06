import './fullscreen.scss'

import {
  defineComponent,
  useSlots,
  renderSlot,
  onMounted,
  onBeforeUnmount,
  ref
} from 'vue'
import { fullscreenProps, FullscreenProps } from './fullscreen-types'

export default defineComponent({
  name: 'DFullscreen',
  props: fullscreenProps,
  emits: ['fullscreenLaunch'],
  setup(props: FullscreenProps, ctx) {

    let currentTarget = null
    const isFullscreen = ref(false)
    const slotElement = ref(null)

    const onFullScreenChange = () => {
      if (currentTarget) {
        const targetElement: HTMLElement = currentTarget
        if (document.fullscreenElement) { // 进入全屏
          addFullScreenStyle()
          launchNormalFullscreen(targetElement)
        } else { // 退出全屏
          removeFullScreenStyle()
          currentTarget = null
          exitNormalFullscreen(targetElement)
        }
        // F11退出全屏时，需要将全屏状态传出去
        isFullscreen.value = !!(document.fullscreenElement)
        ctx.emit('fullscreenLaunch', isFullscreen.value)
      }
    }

    // 页面全屏
    const launchNormalFullscreen = (targetElement: HTMLElement) => {
      targetElement.classList.add('fullscreen')
      if (props.zIndex) {
        targetElement.setAttribute('style', `z-index: ${props.zIndex}`)
      }
    }

    // 退出正常全屏
    const exitNormalFullscreen = (targetElement: HTMLElement) => {
      targetElement.classList.remove('fullscreen')
      targetElement.style.zIndex = null
    }

    // 事件监听
    const handleFullscreen = async () => {
      // const targetElement = document.querySelector('[fullscreen-target]')
      const targetElement = slotElement.value.querySelector('[fullscreen-target]')
      let isFull = false
      // 判断模式
      if (props.mode === 'normal') { // 浏览器全屏
        const fullscreen = targetElement.classList.contains('fullscreen')
        if (!fullscreen) { // 进入全屏
          addFullScreenStyle()
          launchNormalFullscreen(targetElement)
          isFull = true
        } else { // 退出全屏
          removeFullScreenStyle()
          exitNormalFullscreen(targetElement)
          isFull = false
        }
      } else { // 沉浸式全屏
        currentTarget = targetElement
        if (document.fullscreenElement || document.msFullscreenElement || document.webkitFullscreenElement) {
          isFull = await exitImmersiveFullScreen(document)
        } else {
          isFull = await launchImmersiveFullScreen(currentTarget)
        }
      }
      isFullscreen.value = isFull
      ctx.emit('fullscreenLaunch', isFullscreen.value)
    }

    const addFullScreenStyle = (): void => {
      document.getElementsByTagName('html')[0].classList.add('devui-fullscreen')
    }

    const removeFullScreenStyle = (): void => {
      document.getElementsByTagName('html')[0].classList.remove('devui-fullscreen')
    }

    const exitImmersiveFullScreen = async (doc: any) => {
      let fullscreenExit = null
      if (doc.exitFullscreen) {
        fullscreenExit = doc.exitFullscreen()
      } else if (doc.mozCancelFullScreen) {
        fullscreenExit = doc.mozCancelFullScreen()
      } else if (doc.webkitCancelFullScreen) {
        fullscreenExit = Promise.resolve(doc.webkitCancelFullScreen());
      } else if (doc.msExitFullscreen) {
        fullscreenExit = Promise.resolve(doc.msExitFullscreen());
      }
      return await fullscreenExit.then(() => !!document.fullscreenElement)
    }

    const launchImmersiveFullScreen = async (docElement: any) => {
      let fullscreenLaunch = null
      if (docElement.requestFullscreen) {
        fullscreenLaunch = docElement.requestFullscreen()
      } else if (docElement.mozRequestFullScreen) {
        fullscreenLaunch = docElement.mozRequestFullScreen()
      } else if (docElement.webkitRequestFullScreen) {
        fullscreenLaunch = Promise.resolve(docElement.webkitRequestFullScreen())
      } else if (docElement.msRequestFullscreen) {
        fullscreenLaunch = Promise.resolve(docElement.msRequestFullscreen())
      }
      return await fullscreenLaunch.then(() => !!document.fullscreenElement)
    }

    const handleKeyDown = (event) => {
      if (event.keyCode === 27) { // 按ESC键退出全屏
        if (isFullscreen.value) {
          const targetElement = slotElement.value.querySelector('[fullscreen-target]')
          if (props.mode === 'normal') {
            removeFullScreenStyle()
            exitNormalFullscreen(targetElement)
          } else {
            if (document.fullscreenElement) { exitImmersiveFullScreen(document) }
          }
          isFullscreen.value = false
          ctx.emit('fullscreenLaunch', isFullscreen.value)
        }
      }
    }

    onMounted(() => {
      const btnLaunch = slotElement.value.querySelector('[fullscreen-launch]')
      if (btnLaunch) { btnLaunch.addEventListener('click', handleFullscreen) }
      document.addEventListener('fullscreenchange', onFullScreenChange)
      document.addEventListener('MSFullscreenChange', onFullScreenChange)
      document.addEventListener('webkitfullscreenchange', onFullScreenChange)
      document.addEventListener('keydown', handleKeyDown)
    })
    onBeforeUnmount(()=>{
      const btnLaunch = slotElement.value.querySelector('[fullscreen-launch]')
      if (btnLaunch) { btnLaunch.removeEventListener('click', handleFullscreen) }
      document.removeEventListener('fullscreenchange', onFullScreenChange)
      document.removeEventListener('MSFullscreenChange', onFullScreenChange)
      document.removeEventListener('webkitfullscreenchange', onFullScreenChange)
      document.removeEventListener('keydown', handleKeyDown)
      // removeFullScreenStyle();
    })
    return () => {
      const defaultSlot = renderSlot(useSlots(), 'default')
      // if (defaultSlot.children.length === 0) throw new Error('未发现全屏元素')
      return (
        <div ref={slotElement}>{defaultSlot}</div>
      )
    }
  }
})

import './fullscreen.scss'

import { 
  defineComponent,
  useSlots,
  renderSlot,
  onMounted,
  onUnmounted,
  ref
} from 'vue'
import { fullscreenProps, FullscreenProps } from './fullscreen-types'

export default defineComponent({
  name: 'DFullscreen',
  props: fullscreenProps,
  emits: ['fullscreenLaunch'],
  setup(props: FullscreenProps, ctx) {

    let currentTarget = ref(null)
    const isFullscreen = ref(false)
    const doc = document
    
    const onFullScreenChange = () => {
      if (currentTarget.value) {
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
        isFullscreen.value = !!(doc.fullscreenElement)
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
    const exitNormalFullscreen = (targetElement: HTMLElement) => {
      targetElement.classList.remove('fullscreen')
      targetElement.style.zIndex = null
    }
    
    // 事件监听
    const handleFullscreen = async () => {
      const targetElement = document.querySelector('[fullscreen-target]')
      let isFull = false
      // 判断模式
      if (props.mode === 'normal') { // 浏览器全屏
        console.log('普通')
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
        console.log('沉浸式')
        currentTarget = targetElement
        if (document.fullscreenElement || document.msFullscreenElement || document.webkitFullscreenElement) {
          isFull = await exitImmersiveFullScreen(document)
        } else {
          isFull = await launchImmersiveFullScreen(document.documentElement)
        }
      }

      isFullscreen.value = isFull
      ctx.emit('fullscreenLaunch', isFullscreen.value)
    }

    const addFullScreenStyle = (): void => {
      document.getElementsByTagName('html')[0].classList.add('devui-fullscreen');
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
      if (event.keyCode === 'ESC_KEYCODE') { // 按ESC键退出全屏
        if (isFullscreen.value) {
          const targetElement = document.querySelector('[fullscreen-target]')
          if (props.mode === 'normal') {
            removeFullScreenStyle()
            exitNormalFullscreen(targetElement)
          } else {
            if (doc.fullscreenElement) { exitImmersiveFullScreen(doc) }
          }
          ctx.emit('fullscreenLaunch', isFullscreen.value)
          isFullscreen.value = false
        }
      }
    }
    
    onMounted (() => {
      console.log(ctx.slots)
      const btnLaunch = document.querySelector('[fullscreen-launch]')
      if (btnLaunch) { btnLaunch.addEventListener('click', handleFullscreen) }
      document.addEventListener('fullscreenchange', onFullScreenChange)
      document.addEventListener('MSFullscreenChange', onFullScreenChange)
      document.addEventListener('webkitfullscreenchange', onFullScreenChange)
      document.addEventListener('keydown', handleKeyDown)
    })
    onUnmounted (() => {
      document.removeEventListener('fullscreenchange', onFullScreenChange)
      document.removeEventListener('MSFullscreenChange', onFullScreenChange)
      document.removeEventListener('webkitfullscreenchange', onFullScreenChange)
      document.removeEventListener('keydown', handleKeyDown)
      const btnLaunch = document.querySelector('[fullscreen-launch]')
      if (btnLaunch) { btnLaunch.removeEventListener('click', handleFullscreen) }
    })
    return () => {
      const defaultSlot = renderSlot(useSlots(), 'default')
      // fullscreen-target 全屏元素属性
      // fullscreen-launch 全屏事件属性
      // if (defaultSlot.children.length === 0) throw new Error('未发现全屏元素')
      // const targetElement = document.querySelector('[fullscreen-target]')
      return (
        <div class="d-fullscreen">
          <div>{ defaultSlot }</div>
        </div>
      )
    }
  }
})

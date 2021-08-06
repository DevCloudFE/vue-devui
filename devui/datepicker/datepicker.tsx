import { defineComponent, ref, reactive, onMounted, onUnmounted } from 'vue'
import Input from './components/input/index'
import PopPanel from './components/pop-panel/index'

import './datepicker.css'

/**
 * 对`getBoundingClientRect`获取到的DOMRect做浅拷贝
 * @param rect 
 * @returns 
 */
const cloneDOMRect = (rect: DOMRect) => {
  const {        
    left, top, width, height, right = left + width, bottom = top + height, x, y
  } = rect
  return { x, y, left, top, width, height, right, bottom }
}

const isIn = (start: Node | null, target: Node | null) => {
  if(!target) {
    return false
  }
  while(start) {
    if(start === target) {
      return true
    }
    start = start.parentNode
  }
  return false
}

const factoryAutoClosePanel = (cont: HTMLElement, cb: () => void) => (e: MouseEvent) => {
  const { target } = e
  if(isIn(target as Node, cont)) {
    return
  }
  cb()
}

const attachEvent = (el: Node | Window, name: string, cb: (e?: any) => any, capture: boolean) => {
  el.addEventListener(name, cb, capture)
  return { el, name, cb, capture }
}

const detachEvent = (el: Node | Window, name: string, cb: (e?: any) => any, capture: boolean) => {
  el.removeEventListener(name, cb, capture)
}


export default defineComponent({
  name: 'DDatepicker',
  props: {
  },
  setup(props, ctx) {
    const container = ref<HTMLElement>()
    const events: { el: Node | Window; cb: (e: any) => void; name: string; capture: boolean; }[] = []

    const state = reactive({
      showPanel: false
    })

    onMounted(() => {
      const { value: cont } = container
      if(!cont) {
        return
      }
      const rect = cloneDOMRect(cont.getBoundingClientRect())
      const handleAutoClosePanel = factoryAutoClosePanel(cont, () => {
        state.showPanel = false
      })
      events.push(attachEvent(document, 'click', handleAutoClosePanel, false))
      // // 窗口失焦点时隐藏弹窗
      // events.push(attachEvent(window, 'blur', () => { state.showPanel = false }, false))
    })

    onUnmounted(() => {
      events.forEach(({ el, cb, name, capture }) => detachEvent(el, name, cb, capture))
      events.splice(0, events.length)
    })

    return () => {

      const handleActive = (e: MouseEvent) => {
        state.showPanel = true
      }

      return (
        <div
          ref={container}
          class="datapicker-container"
        >
          <Input width={140} onActive={handleActive} />
          <PopPanel show={state.showPanel} />
        </div>
      )
    }
  }
})
import { defineComponent, ref, reactive, onMounted, onUnmounted } from 'vue'
import Input from './components/input/index'
import PopPanel from './components/pop-panel/index'
import Calendar from './components/calendar/index'

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

const factoryAutoClosePanel = (cont: Element, cb: () => void) => (e: MouseEvent) => {
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

const getScrollOffset = (el: Element) => {
  let x = 0, y = 0
  while(el.parentElement) {
    el = el.parentElement
    x += el.scrollLeft
    y += el.scrollTop
  }
  return [x, y]
}

const getHostRange = (host: Element): {
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number
} => {
  const { left, top, width, height } = host.getBoundingClientRect()
  const right = window.innerWidth - left - width
  const bottom = window.innerHeight - top - height

  // console.log(left, right, top, bottom)
  return { left, right, top, bottom, width, height }
}

export default defineComponent({
  name: 'DDatepicker',
  props: {
  },
  setup(props, ctx) {
    const container = ref<Element>()
    const popCont = ref<Element>()
    const events: { el: Node | Window; cb: (e: any) => void; name: string; capture: boolean; }[] = []

    const state = reactive<{
      showPanel: boolean
      panelXPos: 'left' | 'right'
      panelYPos: 'top' | 'bottom'
      pointX: string
      pointY: string
    }>({
      showPanel: false,
      panelXPos: 'left',
      panelYPos: 'top',
      pointX: '0px',
      pointY: '0px',
    })

    onMounted(() => {
      const { value: cont } = container
      if(!cont) {
        return
      }
      
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

    const handleActive = (e: Element) => {
      if(state.showPanel) {
        return
      }
      const range = getHostRange(e)
      if(range.left > range.right) {
        state.panelXPos = 'right'
        state.pointX = `${range.width}px`
      } else {
        state.panelXPos = 'left'
        state.pointX = '0px'
      }

      if(range.top > range.bottom) {
        state.panelYPos = 'bottom'
        state.pointY = '0px'
      } else {
        state.panelYPos = 'top'
        state.pointY = `${range.height}px`
      }
      state.showPanel = true
    }

    return () => {
      return (
        <div
          ref={container}
          class="datapicker-container"
        >
          <Input width={140} onActive={handleActive} />
          <div ref={popCont} class="datepicker-pop-container" style={{ left: state.pointX, top: state.pointY }}>
            <PopPanel
              // show={state.showPanel}
              show={state.showPanel}
              xPosition={state.panelXPos}
              yPosition={state.panelYPos}
              xOffset={0}
              yOffset={0}
              children={
                <div style={{
                  padding: '0px', margin: '0px 0px',
                  whiteSpace: 'nowrap',
                  boxShadow: `0 0 4px 2px rgba(0, 0, 0, 0.2)`
                }}><Calendar mode="range" /></div>
              }
            />
          </div>
        </div>
      )
    }
  }
})
import { defineComponent, ref, reactive, onMounted, onUnmounted } from 'vue'
import Input from './components/input'
import PopPanel from './components/pop-panel'
import Calendar from './components/calendar'

import './datepicker.css'

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

    const inputState = reactive<{
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

    const dateState = reactive<{
      type?: 'select' | 'range'
      dateCurrent?: Date
      dateNext?: Date
      dateStart?: Date
      dateEnd?: Date
      dateHover?: Date
    }>({
      type: 'range',
      dateCurrent: new Date(),
      dateNext: new Date(2021, 8, 2)
    })

    onMounted(() => {
      const { value: cont } = container
      if(!cont) {
        return
      }
      
      const handleAutoClosePanel = factoryAutoClosePanel(cont, () => {
        inputState.showPanel = false
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
      if(inputState.showPanel) {
        return
      }
      const range = getHostRange(e)
      if(range.left > range.right) {
        inputState.panelXPos = 'right'
        inputState.pointX = `${range.width}px`
      } else {
        inputState.panelXPos = 'left'
        inputState.pointX = '0px'
      }

      if(range.top > range.bottom) {
        inputState.panelYPos = 'bottom'
        inputState.pointY = '0px'
      } else {
        inputState.panelYPos = 'top'
        inputState.pointY = `${range.height}px`
      }
      inputState.showPanel = true
    }

    const handleSwitch = (index: number, pos: number, date: Date) => {
      switch(index) {
        case 0: // previous year
          const preYear = new Date(date)
          preYear.setFullYear(preYear.getFullYear() - 1)
          pos === 0 ? (dateState.dateCurrent = preYear) : (dateState.dateNext = preYear)
          break
        case 1: // previous month
          const preMonth = new Date(date)
          preMonth.setMonth(preMonth.getMonth() - 1)
          pos === 0 ? (dateState.dateCurrent = preMonth) : (dateState.dateNext = preMonth)
          break
        case 2: // next month
          const nextMonth = new Date(date)
          nextMonth.setMonth(nextMonth.getMonth() + 1)
          pos === 0 ? (dateState.dateCurrent = nextMonth) : (dateState.dateNext = nextMonth)
          break
        case 3: // next year
          const nextYear = new Date(date)
          nextYear.setFullYear(nextYear.getFullYear() + 1)
          pos === 0 ? (dateState.dateCurrent = nextYear) : (dateState.dateNext = nextYear)
          break
      }
    }

    return () => {
      return (
        <div ref={container} class="datapicker-container">
          <Input width={140} onActive={handleActive} />
          <div ref={popCont} class="datepicker-pop-container" style={{ left: inputState.pointX, top: inputState.pointY }}>
            <PopPanel
              show={inputState.showPanel}
              xPosition={inputState.panelXPos}
              yPosition={inputState.panelYPos}
              xOffset={0}
              yOffset={0}
            ><Calendar
              type="range"
              current={dateState.dateCurrent}
              next={dateState.dateNext}
              dateStart={dateState.dateStart}
              dateEnd={dateState.dateEnd}
              dateHover={dateState.dateHover}
              onReset={(date: Date) => {
                dateState.dateEnd = dateState.dateHover = undefined
                dateState.dateStart = date
              }}
              onSelected={(date: Date) => dateState.dateStart = date}
              onSelectStart={(date: Date) => dateState.dateStart = date}
              onSelectEnd={(date: Date) => dateState.dateEnd = date}
              onSelecting={(date: Date) => dateState.dateHover = date}
              onPreviousYear={(date: Date, pos: number) => handleSwitch(0, pos, date)}
              onPreviousMonth={(date: Date, pos: number) => handleSwitch(1, pos, date)}
              onNextMonth={(date: Date, pos: number) => handleSwitch(2, pos, date)}
              onNextYear={(date: Date, pos: number) => handleSwitch(3, pos, date)}
            /></PopPanel>
          </div>
        </div>
      )
    }
  }
})
import { defineComponent, reactive, onMounted, onUnmounted, ref } from 'vue'
import { formatDate, formatRange } from './utils'
import Calendar from './components/calendar'
import './datepicker.css'

type TState = {
  range?: boolean
  current?: Date
  next?: Date
  start?: Date
  end?: Date
  hover?: Date
  show?: boolean
  input?: string
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

const handleCalendarSwitchState = (state: TState, index: number, pos: number, date: Date) => {
  switch(index) {
    case 0: // previous year
      const preYear = new Date(date)
      preYear.setFullYear(preYear.getFullYear() - 1)
      pos === 0 ? (state.current = preYear) : (state.next = preYear)
      break
    case 1: // previous month
      const preMonth = new Date(date)
      preMonth.setMonth(preMonth.getMonth() - 1)
      pos === 0 ? (state.current = preMonth) : (state.next = preMonth)
      break
    case 2: // next month
      const nextMonth = new Date(date)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      pos === 0 ? (state.current = nextMonth) : (state.next = nextMonth)
      break
    case 3: // next year
      const nextYear = new Date(date)
      nextYear.setFullYear(nextYear.getFullYear() + 1)
      pos === 0 ? (state.current = nextYear) : (state.next = nextYear)
      break
  }
}

const formatOutputValue = (state: TState, props: any) => {
  const { format = 'y/MM/dd', range, rangeSpliter = '-' } = props || {}
  if(range) {
    return formatRange(format,
      state.start,
      state.end,
      rangeSpliter
    )
  } else {
    return formatDate(format, state.start)
  }
}

const handleDomOutput = (id: string | undefined, output: string) => {
  if(id && typeof id === 'string') {
    const el = document.querySelector(id)
    if(el instanceof HTMLInputElement) {
      el.value = output
    }
  }
}

const invokeFunction = (fn: any, ...args: any[]) => {
  if(typeof fn === 'function') {
    fn(...args)
  }
}

const traceScroll = (el: Node, callback: (e: Event) => void) => {
  const cb = (e: Event) => {
    typeof callback === 'function' && callback(e)
  }
  const els: Node[] = [], name = 'scroll'
  while(el.parentNode) {
    els.push(el.parentNode)
    el.parentNode.addEventListener(name, cb)
    el = el.parentNode
  }
  return { elements: els, callback: cb, name }
}

export default defineComponent({
  name: 'DDatepicker',
  props: {
    selectedDateChange: { type: Function },
    autoClose: { type: Boolean, default: false },
    range: { type: Boolean, default: false },
    format: { type: String, default: 'y/MM/dd' },
    rangeSpliter: { type: String, default: '-' },
    attachInputDom: { type: String }
  },
  setup(props, ctx) {

    const container = ref<Element>()
    const events: { el: Node | Window; cb: (e: any) => void; name: string; capture: boolean; }[] = []

    const state = reactive<TState>({
      range: !!props.range,
      current: new Date(),
      show: false,
    })

    const pos = reactive<{
      x: string
      y: string
    }>({
      x: '0',
      y: '0',
    })

    const getAttachInputDom = () => {
      const { attachInputDom } = props || {}
      if(!attachInputDom || typeof attachInputDom !== 'string') {
        return null
      }
      const el = document.querySelector(attachInputDom)
      if(!el) {
        return null
      }
      return el
    }

    const handlePosition = () => {
      if(!state.show) {
        pos.x = `-100%`
        pos.y = `-100%`
        return
      }
      const el = getAttachInputDom()
      if(!el) {
        return
      }
      const { left, top, width, height } = el.getBoundingClientRect()
      const { width: _width, height: _height } = container.value.getBoundingClientRect()
      const bottom = window.innerHeight - top - height
      pos.x = `${left}px`
      if(bottom > top) {
        pos.y = `${top + height}px`
      } else {
        pos.y = `${top - _height}px`
      }
      
    }

    const handleAttachInputDom = () => {
      const el = getAttachInputDom()
      if(!el) {
        state.show = true
        return
      }

      if(el instanceof HTMLInputElement) {
        const format = props.format || `y/MM/dd`
        const sp = props.rangeSpliter || '-'
        el.placeholder = props.range ? `${format} ${sp} ${format}` : format
      }
      state.show = false
      state.input = props.attachInputDom
      events.push(attachEvent(el, 'click', () => !state.show && (state.show = true), false))
      events.push(attachEvent(document, 'click', (e: MouseEvent) => {
        if(!state.show || e.target === el || isIn(e.target as Node, container.value)) {
          return
        }
        state.show = false
      }, false))
      const tracing = traceScroll(el, () => {
        // console.log(111)
        handlePosition()
      })
      tracing.elements.forEach(node => {
        events.push({ el: node, cb: tracing.callback, name: tracing.name, capture: false })
      })
    }

    onMounted(() => {
      handleAttachInputDom()
    })

    onUnmounted(() => {
      events.forEach(({ el, cb, name, capture }) => detachEvent(el, name, cb, capture))
      events.splice(0, events.length)
    })

    return () => {
      handlePosition()
      return (
        <div class="datepicker-global-viewport">
          <div
            ref={container}
            class="datepicker-container"
            style={{
              transform: `translateX(${pos.x}) translateY(${pos.y})`
            }}
          >
            <Calendar
              type={props.range ? 'range' : 'select'}
              current={state.current}
              next={state.next}
              dateStart={state.start}
              dateEnd={state.end}
              dateHover={state.hover}
              onReset={(date: Date) => {
                state.end = state.hover = undefined
                state.start = date
              }}
              onChange={() => {
                const output = formatOutputValue(state, props)
                handleDomOutput(state.input, output)
                invokeFunction(props.selectedDateChange, output)
                if(props.autoClose) {
                  state.show = false
                }
              }}
              onSelected={(date: Date) => state.start = date}
              onSelectStart={(date: Date) => state.start = date}
              onSelectEnd={(date: Date) => state.end = date}
              onSelecting={(date: Date) => state.hover = date}
              onPreviousYear={(date: Date, pos: number) => handleCalendarSwitchState(state, 0, pos, date)}
              onPreviousMonth={(date: Date, pos: number) => handleCalendarSwitchState(state, 1, pos, date)}
              onNextMonth={(date: Date, pos: number) => handleCalendarSwitchState(state, 2, pos, date)}
              onNextYear={(date: Date, pos: number) => handleCalendarSwitchState(state, 3, pos, date)}
            />
          </div>
        </div>
      )
    }
  }
})
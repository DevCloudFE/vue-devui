import { defineComponent, reactive, onMounted, onUnmounted, ref } from 'vue'
import {
  EventManager,
  formatDate, formatRange, isIn,
  traceNode, invokeFunction,
} from './utils'
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
  st?: boolean
}

/**
 * Calendar 面板年月切换逻辑
 * @param state 
 * @param index 
 * @param pos 
 * @param date 
 */
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

/**
 * 格式化日期
 * @param state 
 * @param props 
 * @returns 
 */
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

const getPlaceholder = (props: any) => {
  if(!props) return ''
  const format = props.format || `y/MM/dd`
  const sp = props.rangeSpliter || '-'
  return props.range ? `${format} ${sp} ${format}` : format
}

/**
 * 输出日期选择结果
 * @param id 
 * @param output 
 */
const handleDomOutput = (id: string | undefined, output: string) => {
  if(id && typeof id === 'string') {
    const el = document.querySelector(id)
    if(el instanceof HTMLInputElement) {
      el.value = output
    }
  }
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
    const evtman = new EventManager()

    const state = reactive<TState>({
      range: !!props.range,
      current: new Date(),
      show: false,
      input: props.attachInputDom,
      st: true
    })

    const pos = reactive<{
      x: string
      y: string
    }>({
      x: '0',
      y: '0',
    })

    /**
     * 获取绑定节点
     * @returns 
     */
    const getAttachInputDom = () => {
      const { attachInputDom } = props || {}
      if(!attachInputDom || typeof attachInputDom !== 'string') {
        return null
      }
      const el = document.querySelector(attachInputDom)
      if(!el) {
        return null
      }
      state.st = false
      return el
    }

    /**
     * 绑定弹出层场景，计算弹出层位置。
     * @returns 
     */
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

    onMounted(() => {
      // 获取绑定节点（默认input）
      const el = getAttachInputDom()
      // 绑定节点不存在，作为普通组件展示。
      if(!el) {
        // 显示组件
        state.show = true
        return
      } else {
        // 作为弹出层，先隐藏
        state.show = false
      }

      // 判断节点原生DOM类型
      // 对input节点的值处理
      if(el instanceof HTMLInputElement) {
        // 设置水印文字
        el.placeholder = getPlaceholder(props)
      }

      // 绑定节点click事件处理弹出层显示
      evtman.append(el, 'click', () => !state.show && (state.show = true))
      // document层处理`点击其他区域隐藏`
      evtman.append(document, 'click', (e: MouseEvent) => {
        if(!state.show || e.target === el || isIn(e.target as Node, container.value)) {
          return
        }
        state.show = false
      })
      // 对绑定节点做scroll跟踪，并绑定跟踪事件
      traceNode(el).forEach(node => {
        evtman.append(node, 'scroll', handlePosition)
      })
    })

    onUnmounted(() => {
      evtman.dispose()
    })

    return () => {
      handlePosition()
      return (
        <div className={state.st ? `` : `datepicker-global-viewport`}>
          <div
            ref={container}
            class="datepicker-container"
            style={{
              transform: state.st ? '' : `translateX(${pos.x}) translateY(${pos.y})`
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
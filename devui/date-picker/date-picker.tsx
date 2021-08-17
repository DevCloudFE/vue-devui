import { defineComponent, reactive, onMounted, onUnmounted, ref } from 'vue'
import {
  EventManager, isIn,
  traceNode, invokeFunction,
} from './utils'

import {
  TState,
  handlePositionFactory,
  handleCalendarSwitchState,
  formatValue,
  formatPlaceholder,
  getAttachInputDom,
} from './helper'

import Calendar from './components/calendar'

import './date-picker.scss'
import { parseDate } from './components/utils'

export default defineComponent({
  name: 'DDatepicker',
  props: {
    selectedDateChange: { type: Function },
    autoClose: { type: Boolean, default: false },
    range: { type: Boolean, default: false },
    showTime: { type: Boolean, default: false },
    format: { type: String, default: 'y/MM/dd' },
    rangeSpliter: { type: String, default: '-' },
    attachInputDom: { type: String },
    dateMin: { type: String },
    dateMax: { type: String },
    showToday: { type: Boolean, default: false },
  },
  setup(props, ctx) {

    const container = ref<Element>()
    const evtman = new EventManager()
    const current = new Date()

    const state = reactive<TState>({
      range: !!props.range,
      current,
      next: new Date(current.getFullYear(), current.getMonth() + 1, 1),
      show: false,
      input: props.attachInputDom,
      st: true,
      x: '0',
      y: '0',
    })

    // 弹出层跟踪
    const handlePosition = handlePositionFactory(state, props, container)

    // 绑定层显示值、placehoder值设置
    const setBindingDom = (el: any = getAttachInputDom(state, props)) => {

      const value = formatValue(state, props)
      const placeholder = formatPlaceholder(props)

      // 判断节点原生DOM类型
      // 对input节点的值处理
      if (el instanceof HTMLInputElement) {
        // 设置水印文字
        el.placeholder = placeholder
        // 设置显示值
        el.value = value
        return el.value
      }
      return value
    }

    const reset = () => {
      state.hover = null
      state.current = null
      state.next = null
      if (state.start) {
        if (state.end && Math.abs(state.end.getMonth() - state.start.getMonth()) > 0) {
          state.next = state.end
        }
      } else {
        state.end = null
      }
    }

    onMounted(() => {
      // 获取绑定节点（默认input）
      const el = getAttachInputDom(state, props)
      // 绑定节点不存在，作为普通组件展示。
      if (!el) {
        // 显示组件
        state.show = true
        return
      } else {
        // 作为弹出层，先隐藏
        state.show = false
      }

      setBindingDom(el)

      // 绑定节点click事件处理弹出层显示
      evtman.append(el, 'click', () => !state.show && (state.show = true))
      // document层处理`点击其他区域隐藏`
      evtman.append(document, 'click', (e: MouseEvent) => {
        if (!state.show || e.target === el || isIn(e.target as Node, container.value)) {
          return
        }
        state.show = false
        reset()
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
      setBindingDom()
      return (
        <div class={state.st ? `` : `devui-datepicker-global-viewport`}>
          <div
            ref={container}
            class="devui-datepicker-container"
            style={{
              transform: state.st ? '' : `translateX(${state.x}) translateY(${state.y})`
            }}
          >
            <Calendar
              type={props.range ? 'range' : 'select'}
              showTime={props.showTime}
              showToday={props.showToday}
              current={state.current}
              next={state.next}
              dateMin={parseDate(props.dateMin)}
              dateMax={parseDate(props.dateMax)}
              dateStart={state.start}
              dateEnd={state.end}
              dateHover={state.hover}
              onReset={(date: Date) => {
                state.current = state.end = state.hover = undefined
                state.start = date
              }}
              onChange={() => {
                const output = setBindingDom()
                invokeFunction(props.selectedDateChange, output)
                if (props.autoClose) {
                  state.show = false
                }
              }}
              onToday={(date: Date) => {
                state.current = date
                state.start = date
                const output = setBindingDom()
                invokeFunction(props.selectedDateChange, output)
                if (props.autoClose) {
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
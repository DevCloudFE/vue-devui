import type { UnwrapRef } from 'vue'
import { defineComponent, reactive, onMounted } from 'vue'
import { invokeFunction } from './utils'
import { compareDateSort } from './components/utils'
import Popup from './components/popup'

import {
  TState,
  handleCalendarSwitchState,
  formatValue,
  formatPlaceholder,
  getAttachInputDom,
} from './helper'

import Calendar from './components/calendar'

import './date-picker.scss'
import { parseDate } from './components/utils'

const formatProps = (props: any): TState => {
  const state: TState = {
    range: !!props.range,
    show: false,
    input: props.attachInputDom,
  }
  state.current = parseDate(props.dateMin) || new Date()
  state.next = new Date(state.current.getFullYear(), state.current.getMonth() + 1, 1)
  return state
}

const formatRange = (state: UnwrapRef<TState>) => {
  const [start, end] = [state.start, state.end].sort((a, b) => a.getTime() - b.getTime())

  state.start = start
  state.end = end

  if (compareDateSort(start, end, 'm') !== 0) {
    state.current = start
    state.next = end
  } else {
    if (compareDateSort(start, state.current) < 0) {
      state.current = start
    }
    if (compareDateSort(state.next, end) < 0) {
      state.next = end
    }
  }
}

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

    const state = reactive<TState>(formatProps(props))

    // 绑定层显示值、placehoder值设置
    const setBindingDom = (el: any = getAttachInputDom(props)) => {

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

    onMounted(() => {
      setBindingDom()
    })

    return () => {
      return (
        <Popup
          attach={props.attachInputDom}
          show={state.show}
          onOpen={() => state.show = true}
          onClosed={() => {
            state.show = false
          }}
        >
          <div class="devui-datepicker-container">
            <Calendar
              type={props.range ? 'range' : 'select'}
              showTime={props.showTime}
              current={state.current}
              next={state.next}
              dateMin={parseDate(props.dateMin)}
              dateMax={parseDate(props.dateMax)}
              dateStart={state.start}
              dateEnd={state.end}
              dateHover={state.hover}
              onReset={(date: Date) => {
                state.end = state.hover = undefined
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
              onSelected={(date: Date) => {
                state.start = date
                if (compareDateSort(state.current, date) !== 0) {
                  state.current = date
                }
              }}
              onSelectStart={(date: Date) => state.start = date}
              onSelectEnd={(date: Date) => {
                state.end = date
                formatRange(state)
              }}
              onSelecting={(date: Date) => state.hover = date}
              onPreviousYear={(date: Date, pos: number) => handleCalendarSwitchState(state, 0, pos, date)}
              onPreviousMonth={(date: Date, pos: number) => handleCalendarSwitchState(state, 1, pos, date)}
              onNextMonth={(date: Date, pos: number) => handleCalendarSwitchState(state, 2, pos, date)}
              onNextYear={(date: Date, pos: number) => handleCalendarSwitchState(state, 3, pos, date)}
            />
          </div>
        </Popup>
      )
    }
  }
})
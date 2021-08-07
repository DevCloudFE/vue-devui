import { defineComponent } from 'vue'
import { getMonthWeeklyDays, WEEK_DAYS, invokeCallback } from './utils'
import { TProps, handleDateEnter, cellClassName, trigEvent } from './helper'

import './index.css'

/**
 * 比较日期单位
 * @param small 相对早的日期
 * @param big 相对晚的日期
 * @param mode 比较单位
 * @param min 不能小于这个值
 * @returns 
 */
const compareDate = (small: Date, big: Date, mode: 'year' | 'month', min: number) => {
  if(mode === 'year') {
    return big.getFullYear() - small.getFullYear() > min
  } else {
    const bigMonth = big.getFullYear() * 12 + big.getMonth()
    const smallMonth = small.getFullYear() * 12 + small.getMonth()
    return bigMonth - smallMonth > min
  }
}

const renderToolbar = (date: Date, props: TProps, pos: number) => {
  const dis = [false, false, false, false]
  if(props.type === 'range') {
    if(pos === 1) {
      dis[0] = !compareDate(props.current, props.next, 'year', 1)
      dis[1] = !compareDate(props.current, props.next, 'month', 1)
    } else {
      dis[2] = !compareDate(props.current, props.next, 'month', 1)
      dis[3] = !compareDate(props.current, props.next, 'year', 1)
    }
  }
  return (
    <div class="calendar-toolbar">
      <a
        class={`calendar-toolbar-button ${dis[0] ? 'disabled' : ''}`}
        onClick={() => invokeCallback(props.onPreviousYear, date, pos)}
      >&lt;&lt;</a>
      <a
        class={`calendar-toolbar-button ${dis[1] ? 'disabled' : ''}`}
        onClick={() => invokeCallback(props.onPreviousMonth, date, pos)}
      >&lt;</a>
      <a class="calendar-toolbar-button title">{
        `${date.getFullYear()}年${(date.getMonth() + 1 + '').padStart(2, '0')}月`
      }</a>
      <a
        class={`calendar-toolbar-button ${dis[2] ? 'disabled' : ''}`}
        onClick={() => invokeCallback(props.onNextMonth, date, pos)}
      >&gt;</a>
      <a
        class={`calendar-toolbar-button ${dis[3] ? 'disabled' : ''}`}
        onClick={() => invokeCallback(props.onNextYear, date, pos)}
      >&gt;&gt;</a>
    </div>
  )
}

const renderPanel = (date: Date, props: TProps, pos: number) => {
  return (
    <div class="calendar">
      {renderToolbar(date, props, pos)}
      <ol class="calendar-header calendar-row">{
        WEEK_DAYS.map((day, idx) => <li class="calendar-cell"><b class="calenday-cell-text">{day}</b></li>)
      }</ol>
      <ul class="calendar-body">{
        getMonthWeeklyDays(date).map((row, idx0) => <li class="calendar-row">{
          row.map((day, idx1) => {
            return (
              <span
                class={cellClassName(props, day)}
                onClick={() => trigEvent(props, day)}
                onMouseenter={() => handleDateEnter(props, day)}
              ><i class="calenday-cell-text">{day.date.getDate()}</i></span>
            )
          })
        }</li>)
      }</ul>
    </div>
  )
}

export default defineComponent({
  name: 'DDatepickerCalendar',
  props: {
    type: { type: String },
    current: { type: Date },
    next: { type: Date },
    dateStart: { type: Date },
    dateHover: { type: Date },
    dateEnd: { type: Date },
    onSelected: { type: Function },
    onReset: { type: Function },
    onSelectStart: { type: Function },
    onSelectEnd: { type: Function },
    onSelecting: { type: Function },
    onPreviousYear: { type: Function },
    onPreviousMonth: { type: Function },
    onNextMonth: { type: Function },
    onNextYear: { type: Function },
  },
  setup(props) {
    return () => {
      let { current, next } = props || {}
      if (!(current instanceof Date)) {
        current = new Date
      }
      if(!(next instanceof Date)) {
        next = new Date(current.getFullYear(), current.getMonth() + 1, 1)
      }
      return (
        <div class="calendar-container">
          {renderPanel(current, props as TProps, 0)}
          {props.type === 'range' ? renderPanel(next, props as TProps, 1) : null}
        </div>
      )
    }
  }
})
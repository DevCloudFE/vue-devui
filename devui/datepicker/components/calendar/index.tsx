import { defineComponent } from 'vue'
import { getMonthWeeklyDays, WEEK_DAYS } from './utils'
import { TProps, handleDateEnter, cellClassName, trigEvent } from './helper'

import './index.css'

const renderPanel = (date: Date, props: TProps) => {
  return (
    <div class="calendar">
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
    mode: { type: String },
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
          {renderPanel(current, props as TProps)}
          {props.mode === 'range' ? renderPanel(next, props as TProps) : null}
        </div>
      )
    }
  }
})
import { defineComponent } from 'vue'
import { getMonthWeeklyDays, WEEK_DAYS, invokeCallback, compareDate } from './utils'
import { handleDateEnter, cellClassName, trigEvent } from './helper'
import CalendaToolbar, { CalendaToolbarProps } from './components/toobar'
import { TProps, TDatePanelProps } from './types'
import CalendaDatePanel, { CalendaDatePanelProps } from './components/panel'

import './index.css'

export default defineComponent({
  name: 'DDatepickerCalendar',
  props: {
    next: { type: Date },
    ...CalendaDatePanelProps
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
      const P = props as TProps
      return (
        <div class="calendar-container">
          <CalendaDatePanel
            { ...P }
            pos={0}
            current={current}
            compare={next}
          />
          {
            props.type === 'range'
            ? <CalendaDatePanel { ...P } pos={1} current={next} compare={current} /> 
            : null
          }
        </div>
      )
    }
  }
})
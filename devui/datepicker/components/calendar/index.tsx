import { defineComponent } from 'vue'
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
      return (
        <div class="calendar-container">
          <CalendaDatePanel { ...props } pos={0} current={current} compare={next} />
          {
            props.type === 'range'
            ? <CalendaDatePanel { ...props } pos={1} current={next} compare={current} /> 
            : null
          }
        </div>
      )
    }
  }
})
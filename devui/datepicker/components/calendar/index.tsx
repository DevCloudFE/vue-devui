import { defineComponent, onMounted, ref } from 'vue'
import { TProps } from './types'
import CalendarDatePanel from './components/panel'

import './index.css'

const TimePicker = defineComponent({
  props: {
    time: { type: Date }
  },
  setup(props) {
    const hour = ref<Element>()
    const minute = ref<Element>()
    const second = ref<Element>()
    const idxes = [0, 0, 0]
    onMounted(() => {
      if(hour.value) {
        hour.value.scrollTop = idxes[0] * 32
      }
      if(minute.value) {
        minute.value.scrollTop = idxes[1] * 32
      }
      if(second.value) {
        second.value.scrollTop = idxes[2] * 32
      }
    })

    return () => {
      const { time = new Date() } = props || {}
      const h = time.getHours(), m = time.getMinutes(), s = time.getSeconds()
      console.log(h,m,s)
      return (
        <div className="calendar-panel-time">
          <div className="calendar-panel-time-head">
            <span>{`00:00:00`}</span>
          </div>
          <div className="calendar-panel-time-select">
            <div ref={hour} className="calendar-panel-time-column">{
              Array(24).fill(0).map((_, i) => {
                let className = ''
                if (h === i) {
                  className = 'timepicker-selected'
                  idxes[0] = i
                }
                return <span className={className}>{(i + '').padStart(2, '0')}</span>
              })
            }</div>
            <div ref={minute} className="calendar-panel-time-column">{
              Array(60).fill(0).map((_, i) => {
                let className = ''
                if (m === i) {
                  className = 'timepicker-selected'
                  idxes[1] = i
                }
                return <span className={className}>{(i + '').padStart(2, '0')}</span>
              })
            }</div>
            <div ref={second} className="calendar-panel-time-column">{
              Array(60).fill(0).map((_, i) => {
                let className = ''
                if (s === i) {
                  className = 'timepicker-selected'
                  idxes[2] = i
                }
                return <span className={className}>{(i + '').padStart(2, '0')}</span>
              })
            }</div>
          </div>
        </div>
      )
    }
  }
})

const Calendar = (props: TProps) => {
  let { current } = props
  if (!(current instanceof Date)) {
    current = new Date
  }
  if (props.type === 'range') {
    let { next } = props
    if (!(next instanceof Date)) {
      next = new Date(current.getFullYear(), current.getMonth() + 1, 1)
    }
    return (
      <div className="calendar-container">
        <CalendarDatePanel {...props} pos={0} current={current} compare={next} />
        <TimePicker time={current} />
        <CalendarDatePanel {...props} pos={1} current={next} compare={current} />
        <TimePicker time={next} />
      </div>
    )
  } else {
    return (
      <div className="calendar-container">
        <CalendarDatePanel {...props} pos={0} current={current} />
        <TimePicker time={current} />
      </div>
    )
  }
}

export default Calendar
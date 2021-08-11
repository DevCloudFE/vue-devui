import { defineComponent, onMounted, ref } from 'vue'
import { TProps } from '../types'
import CalendarDatePanel from '../panel'

import './index.scss'

const TimePicker = defineComponent({
  props: {
    time: { type: Date }
  },
  setup(props) {
    const hour = ref<Element>()
    const minute = ref<Element>()
    const second = ref<Element>()
    const idxes = [0, 0, 0]
    const size = 24
    onMounted(() => {
      if(hour.value) {
        // hour.value.scrollTop = idxes[0] * size
        hour.value.scrollTop = idxes[0] * size
        console.log(idxes[0] * size)
      }
      if(minute.value) {
        minute.value.scrollTop = idxes[1] * size
      }
      if(second.value) {
        second.value.scrollTop = idxes[2] * size
      }
    })

    return () => {
      const { time = new Date() } = props || {}
      const h = time.getHours(), m = time.getMinutes(), s = time.getSeconds()
      return (
        <div className="devui-calendar-timepicker">
          <div className="head">
            <span>{`00:00:00`}</span>
          </div>
          <div className="select">
            <div ref={hour} className="column">{
              Array(24).fill(0).map((_, i) => {
                let className = ''
                if (h === i) {
                  className = 'selected'
                  idxes[0] = i
                }
                return <span className={className}>{(i + '').padStart(2, '0')}</span>
              })
            }</div>
            <div ref={minute} className="column">{
              Array(60).fill(0).map((_, i) => {
                let className = ''
                if (m === i) {
                  className = 'selected'
                  idxes[1] = i
                }
                return <span className={className}>{(i + '').padStart(2, '0')}</span>
              })
            }</div>
            <div ref={second} className="column">{
              Array(60).fill(0).map((_, i) => {
                let className = ''
                if (s === i) {
                  className = 'selected'
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

export default TimePicker
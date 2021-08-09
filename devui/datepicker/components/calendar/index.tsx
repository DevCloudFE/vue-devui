import { TProps } from './types'
import CalendarDatePanel from './components/panel'

import './index.css'

const Calendar = (props: TProps) => {
  let { current } = props
  if (!(current instanceof Date)) {
    current = new Date
  }
  if(props.type === 'range') {
    let { next } = props
    if(!(next instanceof Date)) {
      next = new Date(current.getFullYear(), current.getMonth() + 1, 1)
    }
    return (
      <div className="calendar-container">
        <CalendarDatePanel { ...props } pos={0} current={current} compare={next} />
        <CalendarDatePanel { ...props } pos={1} current={next} compare={current} /> 
      </div>
    )
  } else {
    return (
      <div className="calendar-container">
        <CalendarDatePanel { ...props } pos={0} current={current} />
      </div>
    )
  }
}

export default Calendar
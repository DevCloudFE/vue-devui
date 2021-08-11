import { compareDate } from '../utils'
import { Year, Month } from '../icon'
import { TDateToolbarProps } from '../types'
import Item, { CalendarToolbarTitle as Title } from '../toolbar-item'
import './index.css'

const CalendarToolbar = (props: TDateToolbarProps) => {
    const {
        type, current, compare, pos,
        onPreviousYear,
        onPreviousMonth,
        onNextMonth,
        onNextYear,
    } = props

    const dis = [false, false, false, false]
    if (type === 'range') {
        if (pos === 1) {
            dis[0] = !compareDate(compare, current, 'year', 1)
            dis[1] = !compareDate(compare, current, 'month', 1)
        } else {
            dis[2] = !compareDate(current, compare, 'month', 1)
            dis[3] = !compareDate(current, compare, 'year', 1)
        }
    }

    return (
        <div className="calendar-toolbar">
            <Item disabled={dis[0]} date={current} pos={pos} button={Year} cb={onPreviousYear} />
            <Item disabled={dis[1]} date={current} pos={pos} button={Month} rotate={-90} cb={onPreviousMonth} />
            <Title date={current} />
            <Item disabled={dis[2]} date={current} pos={pos} button={Month} rotate={90} cb={onNextMonth} />
            <Item disabled={dis[3]} date={current} pos={pos} button={Year} rotate={180} cb={onNextYear} />
        </div>
    )
}

export default CalendarToolbar
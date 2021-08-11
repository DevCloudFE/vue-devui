import { invokeCallback } from '../utils'
import { TIconSvg } from '../types'
import './index.css'

export type TCalendarToolbarItemProps = {
    disabled?: boolean
    rotate?: number
    cb?: (...args: any[]) => void
    pos: number
    date: Date
    button: TIconSvg
}

const CalendarToolbarItem = (props: TCalendarToolbarItemProps) => {
    const {
        button: Btn,
        disabled = false,
        rotate = 0,
        date,
        pos,
        cb,
    } = props
    const color = disabled ? '#cfd0d3' : '#585d6b'
    const className = `calendar-toolbar-button ${disabled ? 'disabled' : ''}`
    const handleClick = disabled ? undefined : () => invokeCallback(props.cb, date, pos)
    return (
        <a className={className} onClick={handleClick}>
            <Btn color={color} rotate={rotate} />
        </a>
    )
}

export const CalendarToolbarTitle = (props: { date: Date; }) => {
    const { date } = props
    return (
        <a className="calendar-toolbar-button title">{
            `${date.getFullYear()}年${(date.getMonth() + 1 + '').padStart(2, '0')}月`
        }</a>
    )
}

export default CalendarToolbarItem
import { TDatePanelProps } from '../../types'
import { getMonthWeeklyDays, WEEK_DAYS } from '../../utils'
import { handleDateEnter, cellClassName, trigEvent } from '../../helper'
import Toolbar from '../toolbar'
import './index.css'

const CalendarDatePanel = (props: TDatePanelProps) => {
    return (
        <div className="calendar-panel">
            <Toolbar
                current={props.current}
                compare={props.compare}
                pos={props.pos}
                type={props.type}
                onPreviousYear={props.onPreviousYear}
                onPreviousMonth={props.onPreviousMonth}
                onNextMonth={props.onNextMonth}
                onNextYear={props.onNextYear}
            />
            <ol className="calendar-panel-header calendar-panel-row">{
                WEEK_DAYS.map(day => <li className="calendar-panel-cell"><b className="calendar-head-cell-text">{day}</b></li>)
            }</ol>
            <ul className="calendar-panel-body">{
                getMonthWeeklyDays(props.current).map(row => <li className="calendar-panel-row">{
                    row.map(day => {
                        return (
                            <span
                                className={cellClassName(props as TDatePanelProps, day)}
                                onClick={() => trigEvent(props as TDatePanelProps, day)}
                                onMouseenter={() => handleDateEnter(props as TDatePanelProps, day)}
                            ><i className="calendar-panel-cell-text">{day.date.getDate()}</i></span>
                        )
                    })
                }</li>)
            }</ul>
        </div>
    )
}

export default CalendarDatePanel
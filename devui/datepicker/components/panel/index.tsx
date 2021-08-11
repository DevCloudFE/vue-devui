import { TDatePanelProps } from '../types'
import { getMonthWeeklyDays, WEEK_DAYS } from '../utils'
import { handleDateEnter, cellClassName, trigEvent } from '../helper'
import Toolbar from '../toolbar'
import './index.css'

const CalendarDatePanel = (props: TDatePanelProps) => {
    return (
        <div class="calendar-panel">
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
            <ol class="calendar-panel-header calendar-panel-row">{
                WEEK_DAYS.map(day => <li class="calendar-panel-cell"><b class="calendar-head-cell-text">{day}</b></li>)
            }</ol>
            <ul class="calendar-panel-body">{
                getMonthWeeklyDays(props.current).map(row => <li class="calendar-panel-row">{
                    row.map(day => {
                        return (
                            <span
                            class={cellClassName(props as TDatePanelProps, day)}
                                onClick={() => trigEvent(props as TDatePanelProps, day)}
                                onMouseenter={() => handleDateEnter(props as TDatePanelProps, day)}
                            ><i class="calendar-panel-cell-text">{day.date.getDate()}</i></span>
                        )
                    })
                }</li>)
            }</ul>
        </div>
    )
}

export default CalendarDatePanel
import { TDatePanelProps } from '../types'
import { getMonthWeeklyDays, WEEK_DAYS } from '../utils'
import { handleDateEnter, cellClassName, trigEvent } from '../helper'
import Toolbar from '../toolbar'
import TodayDefault from '../today-default'
import './index.scss'

const CalendarDatePanel = (props: TDatePanelProps) => {
    return (
        <div class="devui-calendar-panel">
            <Toolbar
                current={props.current}
                compare={props.compare}
                pos={props.pos}
                type={props.type}
                showTime={props.showTime}
                onPreviousYear={props.onPreviousYear}
                onPreviousMonth={props.onPreviousMonth}
                onNextMonth={props.onNextMonth}
                onNextYear={props.onNextYear}
                dateMax={props.dateMax}
                dateMin={props.dateMin}
            />
            <ol class="head row">{
                WEEK_DAYS.map(day => <li class="cell">{day}</li>)
            }</ol>
            <ul class="body">{
                getMonthWeeklyDays(props.current).map(row => <li class="row">{
                    row.map(day => {
                        return (
                            <span
                            class={cellClassName(props, day)}
                                onClick={() => trigEvent(props, day)}
                                onMouseenter={() => handleDateEnter(props, day)}
                            >{day.date.getDate()}</span>
                        )
                    })
                }</li>)
            }</ul>
            {props.type !== 'range' && props.showToday ? (<div class="today-container">
                <TodayDefault onSelected={today => {
                    typeof props.onToday === 'function' && props.onToday(today, 0)
                }} />
            </div>) : null}
        </div>
    )
}

export default CalendarDatePanel
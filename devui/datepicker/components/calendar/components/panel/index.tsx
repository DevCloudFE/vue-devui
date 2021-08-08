import { defineComponent } from 'vue'
import { TDatePanelProps } from '../../types'
import { getMonthWeeklyDays, WEEK_DAYS } from '../../utils'
import { handleDateEnter, cellClassName, trigEvent } from '../../helper'
import CalendaToolbar, { CalendaToolbarProps } from '../toobar'
import './index.css'

export const CalendaDatePanelEventProps = {
    onSelected: { type: Function },
    onReset: { type: Function },
    onSelectStart: { type: Function },
    onSelectEnd: { type: Function },
    onSelecting: { type: Function },
}

export const CalendaDatePanelProps = {
    ...CalendaToolbarProps,
    dateStart: { type: Date },
    dateHover: { type: Date },
    dateEnd: { type: Date },
    ...CalendaDatePanelEventProps,
}

const CalendaDatePanel = defineComponent({
    name: 'CalendaDatePanel',
    props: {
        pos: { type: Number },
        compare: { type: Date },
        ...CalendaDatePanelProps
    },
    setup(_props) {
        const props = _props as TDatePanelProps
        return () => {
            return (
                <div class="calendar">
                    <CalendaToolbar
                        current={props.current}
                        compare={props.compare}
                        pos={props.pos}
                        type={props.type}
                        onPreviousYear={props.onPreviousYear}
                        onPreviousMonth={props.onPreviousMonth}
                        onNextMonth={props.onNextMonth}
                        onNextYear={props.onNextYear}
                    />
                    <ol class="calendar-header calendar-row">{
                        WEEK_DAYS.map(day => <li class="calendar-cell"><b class="calenday-cell-text">{day}</b></li>)
                    }</ol>
                    <ul class="calendar-body">{
                        getMonthWeeklyDays(props.current).map((row, idx0) => <li class="calendar-row">{
                            row.map((day, idx1) => {
                                return (
                                    <span
                                        class={cellClassName(props as TDatePanelProps, day)}
                                        onClick={() => trigEvent(props as TDatePanelProps, day)}
                                        onMouseenter={() => handleDateEnter(props as TDatePanelProps, day)}
                                    ><i class="calenday-cell-text">{day.date.getDate()}</i></span>
                                )
                            })
                        }</li>)
                    }</ul>
                </div>
            )
        }
    }
})

export default CalendaDatePanel
import { defineComponent } from 'vue'
import { invokeCallback, compareDate } from '../../utils'
import './index.css'

const CalendaToolbarItem = defineComponent({
    name: 'CalendaToolbarItem',
    props: {
        disabled: { type: Boolean },
        text: { type: String },
        cb: { type: Function },
        pos: { type: Number },
        date: { type: Date }
    },
    setup(props) {
        return () => {
            return (
                <a
                    class={`calendar-toolbar-button ${props.disabled ? 'disabled' : ''}`}
                    onClick={
                        props.disabled
                            ? undefined
                            : () => invokeCallback(props.cb, props.date, props.pos)
                    }
                >{props.text}</a>
            )
        }
    }
})

export const CalendaToolbarEventProps = {
    onPreviousYear: { type: Function },
    onPreviousMonth: { type: Function },
    onNextMonth: { type: Function },
    onNextYear: { type: Function },
}

export const CalendaToolbarDataProps = {
    type: { type: String },
    mode: { type: String },
    current: { type: Date },
}

export const CalendaToolbarProps = {
    ...CalendaToolbarDataProps,
    ...CalendaToolbarEventProps,
}

const CalendaToolbar = defineComponent({
    name: 'CalendaToolbar',
    props: {
        pos: { type: Number },
        compare: { type: Date },
        ...CalendaToolbarProps
    },
    setup(props) {
        const {
            onPreviousYear,
            onPreviousMonth,
            onNextMonth,
            onNextYear,
        } = props || {}
        return () => {
            const { type, current, compare, pos } = props || {}
            if (!current) {
                return null
            }
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
                <div class="calendar-toolbar">
                    <CalendaToolbarItem disabled={dis[0]} date={current} pos={pos} text={'<<'} cb={onPreviousYear} />
                    <CalendaToolbarItem disabled={dis[1]} date={current} pos={pos} text={'<'} cb={onPreviousMonth} />
                    <a class="calendar-toolbar-button title">{
                        `${current.getFullYear()}年${(current.getMonth() + 1 + '').padStart(2, '0')}月`
                    }</a>
                    <CalendaToolbarItem disabled={dis[2]} date={current} pos={pos} text={'>'} cb={onNextMonth} />
                    <CalendaToolbarItem disabled={dis[3]} date={current} pos={pos} text={'>>'} cb={onNextYear} />
                </div>
            )
        }
    }
})

export default CalendaToolbar
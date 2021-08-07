import { invokeCallback, TDateCell } from './utils'

export type TEventCallback = (date: Date, position?: number) => void

export type TProps = ({
    type: 'select'
} | {
    type: 'range'
    next: Date
}) & {
    current: Date
    mode: 'month' | 'year'
    dateStart?: Date
    dateHover?: Date
    dateEnd?: Date
    onSelected?: TEventCallback
    onReset?: TEventCallback
    onSelectStart?: TEventCallback
    onSelectEnd?: TEventCallback
    onSelecting?: TEventCallback
    onPreviousYear?: TEventCallback
    onPreviousMonth?: TEventCallback
    onNextMonth?: TEventCallback
    onNextYear?: TEventCallback
}

export const getDateKey = (date: Date) => {
    return date.toDateString()
}

export const cellClassName = (props: TProps, day: TDateCell) => {
    if(day.current !== 0) {
        return 'calendar-cell disabled'
    }
    const key = getDateKey(day.date)
    if (props.type === 'range') {
        if (props.dateStart) {
            if (getDateKey(props.dateStart) === key) {
                return `calendar-cell selected`
            }
            if (props.dateEnd && getDateKey(props.dateEnd) === key) {
                return `calendar-cell selected`
            }
            const innerEnd = props.dateEnd || props.dateHover
            if (innerEnd) {
                const range = innerEnd > props.dateStart ? [props.dateStart, innerEnd] : [innerEnd, props.dateStart]
                if (day.date > range[0] && day.date < range[1]) {
                    return `calendar-cell innerday`
                }
            }
        }
        return `calendar-cell`
    } else {
        return props.dateStart && getDateKey(props.dateStart) === key ? `calendar-cell selected` : `calendar-cell`
    }
}

export const trigEvent = (props: TProps, day: TDateCell) => {
    if(day.current !== 0) {
        return
    }
    if (props.type === 'range') {
        if (!props.dateStart) {
            invokeCallback(props.onSelectStart, day.date)
        } else if (!props.dateEnd) {
            invokeCallback(props.onSelectEnd, day.date)
        } else {
            invokeCallback(props.onReset, day.date)
        }
    } else {
        invokeCallback(props.onSelected, day.date)
    }
}

export const handleDateEnter = (props: TProps, day: TDateCell) => {
    if(day.current !== 0) {
        return
    }
    if (props.type === 'range') {
        const key = getDateKey(day.date)
        if (!props.dateStart || getDateKey(props.dateStart) === key || props.dateEnd) {
            return
        }
        invokeCallback(props.onSelecting, day.date)
    }
}
import { defineComponent, reactive } from 'vue'

import './index.css'

const getHumanDate = (d: Date) => {
	const year = d.getFullYear()
	const month = d.getMonth() + 1
	const date = d.getDate()
	const day = d.getDay()
	const hour = d.getHours()
	const minute = d.getMinutes()
	const second = d.getSeconds()
	const ms = d.getMilliseconds()

	return {
		year, y: year, month, M: month, date, d: date, day,
		hour, H: hour, h: hour,
		minute, m: minute,
		second, s: second,
		ms,
	}
}

const getMonthDays = (year: number, month: number) => {
	const first = new Date(year, month - 1, 1)
	const last = new Date(year, month, 0)
	const dates: Date[] = []

	let day = first.getDay()
	while(day > 0) {
		day -= 1
		dates.push(new Date(year, month - 1, -day))
	}

	day = last.getDate() - first.getDate()
	for(let i = 0; i <= day; i++) {
		const date = new Date(first)
		date.setDate(i + 1)
		dates.push(date)
	}

	day = last.getDay()
	for(let i = day; i < 6; i++) {
		dates.push(new Date(year, month, i - day + 1))
	}
	return dates
}

const getWeeklyDays = (date: Date = new Date()) => {
	const { year, month } = getHumanDate(date)
	const days = getMonthDays(year, month)
	const dayRows = []
	while(days.length > 0) {
		dayRows.push(days.splice(0, 7))
	}
	return dayRows
}

const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六']

export default defineComponent({
	name: 'DDatepickerCalendar',
	props: {
		mode: { type: String }
	},
	setup(props) {

		const state = reactive<{
			dateStartKey: string
			dateStart: Date | null
			dateHoverKey: string
			dateHover: Date | null
			dateEndKey: string
			dateEnd: Date | null
		}>({
			dateStartKey: '',
			dateStart: null,
			dateHoverKey: '',
			dateHover: null,
			dateEndKey: '',
			dateEnd: null,
		})

		const handleDateClick = (key: string, day: Date) => {
			if(props.mode === 'range') {
				if(!state.dateStart) {
					state.dateStart = day
					state.dateStartKey = key
					state.dateEnd = null
					state.dateEndKey = ''
				} else if(!state.dateEnd) {
					state.dateEnd = day
					state.dateEndKey = key
				} else {
					state.dateStart = null
					state.dateStartKey = ''
					state.dateHover = day
					state.dateHoverKey = key
					state.dateEnd = null
					state.dateEndKey = ''
					handleDateClick(key, day)
				}
			} else {
				state.dateStart = day
				state.dateStartKey = key
				state.dateEnd = null
				state.dateEndKey = ''
			}
		}

		const handleDateEnter = (key: string, day: Date) => {
			if(props.mode === 'range') {
				if(!state.dateStart || state.dateStartKey === key || state.dateEnd) {
					return
				}
				state.dateHover = day
				state.dateHoverKey = key
			}
		}

		const cellClassName = (key: string, day: Date) => {
			if(props.mode === 'range') {
				if(state.dateStart) {
					if(state.dateStartKey === key || state.dateEndKey === key) {
						return `calendar-cell selected`
					}
					const innerEnd = state.dateEnd || state.dateHover
					if(innerEnd) {
						const range = innerEnd > state.dateStart ? [state.dateStart, innerEnd] : [innerEnd, state.dateStart]
						if(day > range[0] && day < range[1]) {
							return `calendar-cell innerday`
						}
					}
				} 
				return `calendar-cell`
			} else {
				return state.dateStartKey === key ? `calendar-cell selected` : `calendar-cell`
			}
		}

		return () => {
			return (
				<div class="calendar-container">
					<div class="calendar">
						<ol class="calendar-header calendar-row">{
							WEEK_DAYS.map((day, idx) => <li class="calendar-cell"><b class="calenday-cell-text">{day}</b></li>)
						}</ol>
						<ul class="calendar-body">{
							getWeeklyDays().map((row, idx0) => <li class="calendar-row">{
								row.map((day, idx1) => {
									const key = `${idx0}_${idx1}`
									return (
										<span
											class={cellClassName(key, day)}
											onClick={() => handleDateClick(key, day)}
											onMouseenter={() => handleDateEnter(key, day)}
										><i class="calenday-cell-text">{day.getDate()}</i></span>
									)
								})
							}</li>)
						}</ul>
					</div>
				</div>
			)
		}
	}
})
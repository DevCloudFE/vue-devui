import { ref, onBeforeMount } from 'vue';
import type { SetupContext } from 'vue';
import { DAY_DURATION } from '../const';
import { CalendarDateItem, YearAndMonthItem, UseCalendarPanelReturnType, DatePickerProPanelProps } from '../date-picker-pro-types';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export default function useCalendarPanel(props: DatePickerProPanelProps, ctx: SetupContext): UseCalendarPanelReturnType {
  const yearAndMonthList = ref<YearAndMonthItem[]>([]);
  const allMonthList = ref<YearAndMonthItem[]>([]);
  const isListCollapse = ref(false);
  const today = ref<Date>(new Date());
  const calendarRange = [2020, 2025];
  const calendarCacheData = new Map();
  const selectDate = ref<Dayjs>();
  const fillLeft = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  const getDisplayWeeks = (year: number, month: number): CalendarDateItem[][] => {
    const firstDayOfMonth = new Date(year, month, 1);
    const weekOfDay = firstDayOfMonth.getDay();
    const startDate = new Date(firstDayOfMonth.getTime() - weekOfDay * DAY_DURATION);
    const displayWeeks = [];
    for (let i = 0; i < 6; i++) {
      const startWeekDate = startDate.getTime() + i * 7 * DAY_DURATION;
      const weekDays = new Array(7).fill(0).map((value, index) => {
        const currentDate = new Date(startWeekDate + index * DAY_DURATION);
        return {
          day: fillLeft(currentDate.getDate()),
          date: currentDate,
          inMonth: currentDate.getMonth().toString() === month.toString(),
          isToday: currentDate.toDateString() === today.value.toDateString(),
        };
      });
      displayWeeks.push(weekDays);
    }
    return displayWeeks;
  };

  const initCalendarData = () => {
    const key = calendarRange.join('-');
    if (calendarCacheData.get(key)) {
      yearAndMonthList.value = calendarCacheData.get(key).yearAndMonthList;
      allMonthList.value = calendarCacheData.get(key).allMonthList;
      return;
    }
    yearAndMonthList.value = [];
    allMonthList.value = [];

    for (let year = calendarRange[0]; year <= calendarRange[1]; year++) {
      const yearOption: YearAndMonthItem = {
        year,
        isMonth: false,
        active: false,
      };
      yearAndMonthList.value.push(yearOption);
      for (let month = 0; month < 12; month++) {
        const monthOption: YearAndMonthItem = {
          year,
          month,
          displayWeeks: getDisplayWeeks(year, month),
        };
        allMonthList.value.push(monthOption);
        const yearMonthOption: YearAndMonthItem = {
          year,
          month,
          isMonth: true,
          active: false,
        };
        yearAndMonthList.value.push(yearMonthOption);
      }
    }
    calendarCacheData.set(key, {
      yearAndMonthList: yearAndMonthList.value,
      allMonthList: allMonthList.value,
    });
  };

  onBeforeMount(() => {
    initCalendarData();
    today.value = new Date();
  });

  const handlerSelectDate = (day: CalendarDateItem) => {
    selectDate.value = dayjs(new Date(day.date.setHours(0, 0, 0))).locale('zh-cn');
    ctx.emit('selected-date', selectDate.value);
  };

  return { yearAndMonthList, allMonthList, isListCollapse, handlerSelectDate };
}

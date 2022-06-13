import { ref, onBeforeMount, nextTick } from 'vue';
import type { SetupContext } from 'vue';
import { DAY_DURATION, yearItemHeight, calendarItemHeight } from '../const';
import { CalendarDateItem, YearAndMonthItem, UseCalendarPanelReturnType, DatePickerProPanelProps } from '../date-picker-pro-types';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { throttle } from 'lodash';

export default function useCalendarPanel(props: DatePickerProPanelProps, ctx: SetupContext): UseCalendarPanelReturnType {
  const yearScrollRef = ref<HTMLElement>();
  const monthScrollRef = ref<HTMLElement>();
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
  const currentMonthIndex = ref<number>(0);

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

  const getCurrentIndex = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const yearIndex = isListCollapse.value ? year - calendarRange[0] : (year - calendarRange[0]) * 13 + month + 1;
    return {
      yearIndex,
      monthIndex: (year - calendarRange[0]) * 12 + month,
    };
  };

  const updateYearActive = (index: number) => {
    const curActive = yearAndMonthList.value.find((child) => child.active);
    if (curActive) {
      curActive.active = false;
    }
    yearAndMonthList.value[index].active = true;
  };

  const goToYearDate = (index: number) => {
    updateYearActive(index);
    let scrollHeight = (index - 4) * yearItemHeight;
    if (scrollHeight < 0) {
      scrollHeight = 0;
    }
    nextTick(() => {
      const scrollEl = yearScrollRef.value;
      scrollEl && scrollEl.scroll(0, scrollHeight);
    });
  };

  const goToMonthDate = () => {
    let scrollHeight = currentMonthIndex.value * calendarItemHeight;
    if (scrollHeight < 0) {
      scrollHeight = 0;
    }
    nextTick(() => {
      const scrollEl = monthScrollRef.value;
      scrollEl && scrollEl.scroll(0, scrollHeight);
    });
  };

  const goToShowDate = (date: Date) => {
    const scrollIndexObj = getCurrentIndex(date);
    currentMonthIndex.value = scrollIndexObj.monthIndex;
    goToYearDate(scrollIndexObj.yearIndex);
    goToMonthDate();
  };

  const initCalendarShow = () => {
    if (props.visible) {
      let toDate: Date;
      if (props.dateValue) {
        const date = Array.isArray(props.dateValue) ? props.dateValue[0] : props.dateValue;
        selectDate.value = date;
        toDate = date.toDate();
      } else {
        toDate = today.value;
      }
      goToShowDate(toDate);
    }
  };

  onBeforeMount(() => {
    initCalendarData();
    today.value = new Date();
    // 初始化先展示v-model对应的时间，如果没有展示today对应的时间
    initCalendarShow();
  });

  const handlerSelectDate = (day: CalendarDateItem) => {
    if (!day.inMonth) {
      return;
    }
    selectDate.value = dayjs(new Date(day.date.setHours(0, 0, 0))).locale('zh-cn');
    ctx.emit('selectedDate', selectDate.value);
  };

  const handlerYearCollapse = (date?: Date) => {
    const activeItem = yearAndMonthList.value.find((child) => child.active);
    const selectedYear = activeItem?.year;
    const selectedMonth = activeItem?.month;
    isListCollapse.value = !isListCollapse.value;
    if (isListCollapse.value) {
      yearAndMonthList.value = yearAndMonthList.value.filter((child) => !child.isMonth);
    } else {
      initCalendarData();
    }
    nextTick(() => {
      goToShowDate(date || new Date(selectedYear || calendarRange[0], selectedMonth || 0, 1));
    });
  };

  const handlerClickMonth = (year: number, month: number | undefined) => {
    const date = new Date(year, month || 0, 1);
    const selectYear = yearAndMonthList.value.find((child) => child.active)?.year || selectDate.value?.year() || calendarRange[0];
    if (isListCollapse.value) {
      handlerYearCollapse(date);
    } else {
      goToShowDate(date);
    }
  };

  const handleScrollYearList = (e: UIEvent) => {
    let { scrollTop: newScrollTop } = e.currentTarget as Element;
    newScrollTop = newScrollTop > 0 ? newScrollTop : 0;
  };

  const debounceScrollMonth = throttle((newScrollTop) => {
    currentMonthIndex.value = Math.floor(newScrollTop / calendarItemHeight) + (newScrollTop % calendarItemHeight > 100 ? 1 : 0);
    const yearIndex = isListCollapse.value
      ? Math.floor(currentMonthIndex.value / 12)
      : currentMonthIndex.value + Math.floor(currentMonthIndex.value / 12) + 1;
    goToYearDate(yearIndex);
  }, 200);

  const handleScrollMonthList = (e: UIEvent) => {
    let { scrollTop: newScrollTop } = e.currentTarget as Element;
    newScrollTop = newScrollTop > 0 ? newScrollTop : 0;
    debounceScrollMonth(newScrollTop);
  };

  const isDateSelected = (date: Date) => {
    if (selectDate.value && date) {
      return selectDate.value.toDate().toDateString() === date.toDateString();
    }
    return false;
  };

  const updateSelectedDate = (date: Dayjs) => {
    selectDate.value = date;
  };
  ctx.expose({ updateSelectedDate });
  return {
    yearScrollRef,
    monthScrollRef,
    yearAndMonthList,
    allMonthList,
    isListCollapse,
    handlerSelectDate,
    handlerYearCollapse,
    handlerClickMonth,
    handleScrollYearList,
    handleScrollMonthList,
    isDateSelected,
  };
}

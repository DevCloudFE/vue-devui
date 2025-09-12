import { ref, onBeforeMount, nextTick, watch, onMounted } from 'vue';
import type { SetupContext } from 'vue';
import { DAY_DURATION, calendarItemHeight } from '../const';
import { CalendarDateItem, YearAndMonthItem, UseCalendarPanelReturnType, DatePickerProPanelProps } from '../date-picker-pro-types';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { throttle } from 'lodash';
import useCalendarSelected from './use-calendar-selected';

export default function useCalendarPanel(props: DatePickerProPanelProps, ctx: SetupContext): UseCalendarPanelReturnType {
  const yearScrollRef = ref<HTMLElement>();
  const monthScrollRef = ref<HTMLElement>();
  const yearAndMonthList = ref<YearAndMonthItem[]>([]);
  const allMonthList = ref<YearAndMonthItem[]>([]);
  const isListCollapse = ref(false);
  const calendarCacheData = new Map();
  const currentMonthIndex = ref<number>(0);

  const {
    today,
    calendarRange,
    selectDate,
    rangeSelectDate,
    minDate,
    maxDate,
    fixRangeDate,
    getToDate,
    emitSelectedDate,
    isStartDate,
    isInRangeDate,
    isEndDate,
  } = useCalendarSelected(props, ctx);

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
    const key = calendarRange.value.join('-');
    if (calendarCacheData.get(key)) {
      yearAndMonthList.value = calendarCacheData.get(key).yearAndMonthList;
      allMonthList.value = calendarCacheData.get(key).allMonthList;
      return;
    }
    yearAndMonthList.value = [];
    allMonthList.value = [];

    for (let year = calendarRange.value[0]; year <= calendarRange.value[1]; year++) {
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
    const yearIndex = isListCollapse.value ? year - calendarRange.value[0] : (year - calendarRange.value[0]) * 13 + month + 1;
    return {
      yearIndex,
      monthIndex: (year - calendarRange.value[0]) * 12 + month,
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
    let scrollIndex = index - 4;
    if (scrollIndex < 0) {
      scrollIndex = 0;
    }
    nextTick(() => {
      const scrollEl = yearScrollRef.value;
      scrollEl?.scrollTo?.(scrollIndex);
    });
  };

  const goToMonthDate = () => {
    let scrollIndex = currentMonthIndex.value;
    if (scrollIndex < 0) {
      scrollIndex = 0;
    }
    nextTick(() => {
      const scrollEl = monthScrollRef.value;
      scrollEl?.scrollTo?.(scrollIndex);
    });
  };

  const goToShowDate = (date: Date) => {
    const scrollIndexObj = getCurrentIndex(date);
    currentMonthIndex.value = scrollIndexObj.monthIndex;
    goToYearDate(scrollIndexObj.yearIndex);
    goToMonthDate();
  };

  const initCalendarShow = () => {
    if (!props.visible) {
      return;
    }
    const toDate = getToDate(props.dateValue);
    if (toDate) {
      goToShowDate(toDate.toDate());
    }
  };

  onBeforeMount(() => {
    today.value = new Date();
    calendarRange.value = props.calendarRange;

    // 初始化先展示v-model对应的时间，如果没有展示today对应的时间
    initCalendarData();
  });

  onMounted(() => {
    initCalendarShow();
  });

  const handlerSetRangeDate = (day: CalendarDateItem) => {
    if (props.focusType === 'start') {
      rangeSelectDate.value[0] = dayjs(new Date(day.date.setHours(0, 0, 0))).locale('zh-cn');
    } else if (props.focusType === 'end') {
      rangeSelectDate.value[1] = dayjs(new Date(day.date.setHours(23, 59, 59))).locale('zh-cn');
    }
    fixRangeDate();
  };

  const isDisabled = (date: Date) => {
    if (!date) {
      return true;
    }
    const isInRange =
      (date.getTime() > minDate.value.getTime() && date.getTime() < maxDate.value.getTime()) ||
      date.toDateString() === minDate.value.toDateString() ||
      date.toDateString() === maxDate.value.toDateString();
    return !isInRange;
  };

  const handlerSelectDate = (day: CalendarDateItem) => {
    if (!day.inMonth || isDisabled(day.date)) {
      return;
    }
    selectDate.value = dayjs(new Date(day.date.setHours(0, 0, 0))).locale('zh-cn');
    if (props.isRangeType) {
      handlerSetRangeDate(day);
    }
    emitSelectedDate();
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
      goToShowDate(date || new Date(selectedYear || calendarRange.value[0], selectedMonth || 0, 1));
    });
  };

  const handlerClickMonth = (year: number, month: number | undefined) => {
    const date = new Date(year, month || 0, 1);
    if (isListCollapse.value) {
      handlerYearCollapse(date);
    } else {
      goToShowDate(date);
    }
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

  watch(
    [() => props.dateValue, () => props.focusType],
    ([dateValue, focusType]) => {
      if (Array.isArray(dateValue)) {
        rangeSelectDate.value = dateValue;
        let date: Dayjs | undefined;
        if (focusType === 'start') {
          date = dateValue[0];
        } else {
          // 在选择了startDate后，自动聚焦到endStart， 此时面板展示startDate时间
          date = dateValue[1] || dateValue[0];
        }
        if (date) {
          goToShowDate(date.toDate());
        } else {
          selectDate.value = date;
        }
      } else {
        selectDate.value = dateValue;
        if (dateValue) {
          goToShowDate(dateValue.toDate());
        }
      }
    },
    { deep: true }
  );

  return {
    yearScrollRef,
    monthScrollRef,
    yearAndMonthList,
    allMonthList,
    isListCollapse,
    handlerSelectDate,
    handlerYearCollapse,
    handlerClickMonth,
    handleScrollMonthList,
    isDateSelected,
    isStartDate,
    isInRangeDate,
    isEndDate,
    isDisabled,
  };
}

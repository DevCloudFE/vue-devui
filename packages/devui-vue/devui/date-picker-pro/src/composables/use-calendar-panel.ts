import { ref, onBeforeMount, nextTick, watch } from 'vue';
import type { SetupContext } from 'vue';
import { DAY_DURATION, yearItemHeight, calendarItemHeight } from '../const';
import { CalendarDateItem, YearAndMonthItem, UseCalendarPanelReturnType, DatePickerProPanelProps } from '../date-picker-pro-types';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { throttle } from 'lodash';
import useCalendarCommon from './use-calendar-common';

export default function useCalendarPanel(props: DatePickerProPanelProps, ctx: SetupContext): UseCalendarPanelReturnType {
  const yearScrollRef = ref<HTMLElement>();
  const monthScrollRef = ref<HTMLElement>();
  const yearAndMonthList = ref<YearAndMonthItem[]>([]);
  const allMonthList = ref<YearAndMonthItem[]>([]);
  const isListCollapse = ref(false);
  const calendarCacheData = new Map();
  const currentMonthIndex = ref<number>(0);

  const { today, calendarRange, selectDate, rangeSelectDate, minDate, maxDate, fixRangeDate } = useCalendarCommon(props);

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
    let scrollHeight = (index - 4) * yearItemHeight;
    if (scrollHeight < 0) {
      scrollHeight = 0;
    }
    nextTick(() => {
      const scrollEl = yearScrollRef.value;
      scrollEl?.scroll?.(0, scrollHeight);
    });
  };

  const goToMonthDate = () => {
    let scrollHeight = currentMonthIndex.value * calendarItemHeight;
    if (scrollHeight < 0) {
      scrollHeight = 0;
    }
    nextTick(() => {
      const scrollEl = monthScrollRef.value;
      scrollEl?.scroll?.(0, scrollHeight);
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
    let toDate: Date | undefined;
    if (Array.isArray(props.dateValue)) {
      // 赋值rangeSelectDate
      if (props.dateValue[0]) {
        // 初始化时, 日历面板会默认展示时间范围选择的startDate
        const date = props.dateValue[0];
        toDate = date.toDate();
        rangeSelectDate.value[0] = props.dateValue[0];
      } else {
        toDate = today.value;
      }
      if (props.dateValue[1]) {
        rangeSelectDate.value[1] = props.dateValue[1];
      }
    } else if (!Array.isArray(props.dateValue) && props.dateValue) {
      const date = props.dateValue;
      selectDate.value = date;
      toDate = date.toDate();
    } else {
      toDate = today.value;
    }
    if (toDate) {
      goToShowDate(toDate);
    }
  };

  onBeforeMount(() => {
    today.value = new Date();
    if (props.calendarRange) {
      calendarRange.value = props.calendarRange;
    } else {
      calendarRange.value = [today.value.getFullYear() - 3, today.value.getFullYear() + 3];
    }

    // 初始化先展示v-model对应的时间，如果没有展示today对应的时间
    initCalendarData();
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
    if (props.isRangeType && !props.showTime) {
      if (props.focusType === 'start') {
        ctx.emit('changeRangeFocusType', 'end');
      } else if (props.focusType === 'end' && !rangeSelectDate.value[0]) {
        rangeSelectDate.value[0] = selectDate.value;
      }
    }
    if (props.isRangeType) {
      ctx.emit('selectedDate', rangeSelectDate.value);
    } else {
      ctx.emit('selectedDate', selectDate.value);
    }
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
    const selectYear = yearAndMonthList.value.find((child) => child.active)?.year || selectDate.value?.year() || calendarRange.value[0];
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

  const isStartDate = (date: Date) => {
    if (!props.isRangeType) {
      return false;
    }
    return date.toDateString() === rangeSelectDate.value[0]?.toDate()?.toDateString();
  };

  const isInRangeDate = (date: Date) => {
    if (!props.isRangeType) {
      return false;
    }
    const dateTime = date.getTime();
    const dateStr = date.toDateString();
    const isIn =
      rangeSelectDate.value[0] &&
      rangeSelectDate.value[0].toDate()?.getTime() < dateTime &&
      rangeSelectDate.value[1] &&
      rangeSelectDate.value[1]?.toDate()?.getTime() > dateTime &&
      rangeSelectDate.value[0]?.toDate()?.toDateString() !== dateStr &&
      rangeSelectDate.value[1]?.toDate()?.toDateString() !== dateStr;
    return isIn ? true : false;
  };

  const isEndDate = (date: Date) => {
    if (!props.isRangeType) {
      return false;
    }
    return date.toDateString() === rangeSelectDate.value[1]?.toDate()?.toDateString();
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
    handleScrollYearList,
    handleScrollMonthList,
    isDateSelected,
    isStartDate,
    isInRangeDate,
    isEndDate,
    isDisabled,
  };
}

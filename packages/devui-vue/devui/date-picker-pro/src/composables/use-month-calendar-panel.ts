import { ref, onBeforeMount, nextTick, watch } from 'vue';
import type { SetupContext } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { monthCalendarItemHeight } from '../const';
import { DatePickerProPanelProps, YearAndMonthItem, UseMonthCalendarPanelReturnType } from '../date-picker-pro-types';
import { throttle } from 'lodash';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import useCalendarSelected from './use-calendar-selected';

export default function useMonthCalendarPanel(props: DatePickerProPanelProps, ctx: SetupContext): UseMonthCalendarPanelReturnType {
  const ns = useNamespace('date-picker-pro');
  const yearScrollRef = ref();
  const monthScrollRef = ref();
  const yearList = ref<YearAndMonthItem[]>([]);
  const monthList = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
  ];
  const currentYearIndex = ref<number>(0);

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

  const initYearList = () => {
    const years = [];
    for (let index = calendarRange.value[0]; index <= calendarRange.value[1]; index++) {
      years.push({
        year: index,
        active: false,
      });
    }
    yearList.value = years;
  };

  const updateYearActive = () => {
    const curActive = yearList.value.find((child) => child.active);
    if (curActive) {
      curActive.active = false;
    }
    yearList.value[currentYearIndex.value].active = true;
  };

  const goToYearDate = () => {
    updateYearActive();
    let scrollIndex = currentYearIndex.value - 4;
    if (scrollIndex < 0) {
      scrollIndex = 0;
    }
    nextTick(() => {
      const scrollEl = yearScrollRef.value;
      scrollEl?.scrollTo?.(scrollIndex);
    });
  };

  const goToMonthDate = () => {
    let scrollIndex = currentYearIndex.value;
    if (scrollIndex < 0) {
      scrollIndex = 0;
    }
    nextTick(() => {
      const scrollEl = monthScrollRef.value;
      scrollEl?.scrollTo?.(scrollIndex);
    });
  };

  const goToShowDate = (date: Dayjs) => {
    const year = date.year();
    currentYearIndex.value = year - calendarRange.value[0];
    goToYearDate();
    goToMonthDate();
  };

  onBeforeMount(() => {
    today.value = new Date();
    calendarRange.value = props.calendarRange;
    initYearList();
    const toDate = getToDate(props.dateValue);
    if (props.visible && toDate) {
      goToShowDate(toDate);
    }
  });

  const handlerSelectYear = (year: number) => {
    const toDate = dayjs(new Date(year, 0, 1)).locale('zh-cn');
    goToShowDate(toDate);
  };

  const debounceScrollMonth = throttle((newScrollTop) => {
    currentYearIndex.value = Math.floor(newScrollTop / monthCalendarItemHeight) + (newScrollTop % monthCalendarItemHeight > 100 ? 1 : 0);
    goToYearDate();
  }, 200);

  const handlerMonthScroll = (e: MouseEvent) => {
    let { scrollTop: newScrollTop } = e.currentTarget as Element;
    newScrollTop = newScrollTop > 0 ? newScrollTop : 0;
    debounceScrollMonth(newScrollTop);
  };

  const isThisMonth = (year: number, month: number) => {
    return year === today.value.getFullYear() && month === today.value.getMonth() + 1;
  };

  const isDisableMonth = (year: number, month: number) => {
    const date = new Date(year, month - 1, 1);
    return maxDate.value.getTime() < date.getTime() || minDate.value.getTime() > date.getTime();
  };

  const isActiveMonth = (year: number, month: number) => {
    if (props.isRangeType) {
      return (
        (year === rangeSelectDate.value[0]?.year() && month === rangeSelectDate.value[0]?.month() + 1) ||
        (year === rangeSelectDate.value[1]?.year() && month === rangeSelectDate.value[1]?.month() + 1)
      );
    } else {
      return year === selectDate.value?.year() && month === selectDate.value?.month() + 1;
    }
  };

  const isStartMonth = (year: number, month: number) => {
    const date = new Date(year, month - 1, 1);
    return isStartDate(date);
  };
  const isEndMonth = (year: number, month: number) => {
    const date = new Date(year, month - 1, 1);
    return isEndDate(date);
  };
  const isInRangeMonth = (year: number, month: number) => {
    const date = new Date(year, month - 1, 1);
    return isInRangeDate(date);
  };

  const getMonthItemCls = (year: number, month: number): Record<string, boolean> => {
    return {
      [ns.e('month-item')]: true,
      [ns.e('this-month')]: isThisMonth(year, month),
      [ns.e('month-disabled')]: isDisableMonth(year, month),
      [ns.e('month-active')]: isActiveMonth(year, month),
      [ns.e('month-start')]: isStartMonth(year, month),
      [ns.e('month-end')]: isEndMonth(year, month),
      [ns.e('month-in-range')]: isInRangeMonth(year, month),
    };
  };

  const handlerSetRangeDate = (year: number, month: number) => {
    const date = dayjs(new Date(year, month - 1, 1)).locale('zh-cn');
    // 这里的props.focusType取值在单测里始终是start, 导致单测不过
    if (props.focusType === 'start') {
      rangeSelectDate.value[0] = date;
    } else if (props.focusType === 'end') {
      rangeSelectDate.value[1] = date;
    }
    fixRangeDate();
  };

  const handlerSelectMonth = (year: number, month: number) => {
    if (isDisableMonth(year, month)) {
      return;
    }
    selectDate.value = dayjs(new Date(year, month - 1, 1)).locale('zh-cn');
    if (props.isRangeType) {
      handlerSetRangeDate(year, month);
    }
    emitSelectedDate();
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
          goToShowDate(date);
        } else {
          selectDate.value = date;
        }
      } else {
        selectDate.value = dateValue;
        if (dateValue) {
          goToShowDate(dateValue);
        }
      }
    },
    { deep: true }
  );

  return {
    yearScrollRef,
    monthScrollRef,
    yearList,
    monthList,
    handlerSelectYear,
    handlerMonthScroll,
    getMonthItemCls,
    handlerSelectMonth,
  };
}

import { ref, onBeforeMount, nextTick, watch } from 'vue';
import type { SetupContext } from 'vue';
import { chunk } from 'lodash';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { DatePickerProPanelProps, UseYearCalendarPanelReturnType } from '../date-picker-pro-types';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import useCalendarSelected from './use-calendar-selected';

export default function useYearCalendarPanel(props: DatePickerProPanelProps, ctx: SetupContext): UseYearCalendarPanelReturnType {
  const ns = useNamespace('date-picker-pro');
  const yarListScrollRef = ref();
  const yearList = ref<number[][]>([]);

  const { today, calendarRange, selectDate, rangeSelectDate, minDate, maxDate, fixRangeDate, getToDate, emitSelectedDate } =
    useCalendarSelected(props, ctx);

  const initYearList = () => {
    calendarRange.value[0] = props.calendarRange?.[0] || 1970;
    calendarRange.value[1] = props.calendarRange?.[1] || 2099;
    const list = new Array(calendarRange.value[1] - calendarRange.value[0] + 1).fill(1).map((item, i) => i + calendarRange.value[0]);
    yearList.value = chunk(list, 3);
  };

  const goToShowYear = (date: Dayjs) => {
    if (date) {
      const index = Math.floor((date.year() - calendarRange.value[0]) / 3);
      let scrollIndex = index - 1;
      if (scrollIndex < 0) {
        scrollIndex = 0;
      }
      nextTick(() => {
        const scrollEl = yarListScrollRef.value;
        scrollEl?.scrollTo?.(scrollIndex);
      });
    }
  };

  onBeforeMount(() => {
    today.value = new Date();
    initYearList();
    const toDate = getToDate(props.dateValue);
    if (props.visible && toDate) {
      goToShowYear(toDate);
    }
  });

  const isThisYear = (year: number): boolean => {
    return year === today.value.getFullYear();
  };

  const isDisableYear = (year: number) => {
    const date = new Date(year, 0, 1);
    return maxDate.value.getTime() < date.getTime() || minDate.value.getTime() > date.getTime();
  };

  const isActiveYear = (year: number) => {
    if (props.isRangeType) {
      return year === rangeSelectDate.value[0]?.year() || year === rangeSelectDate.value[1]?.year();
    } else {
      return year === selectDate.value?.year();
    }
  };
  const isStartYear = (year: number) => {
    if (!props.isRangeType) {
      return false;
    }
    return year === rangeSelectDate.value[0]?.year();
  };
  const isEndYear = (year: number) => {
    if (!props.isRangeType) {
      return false;
    }
    return year === rangeSelectDate.value[1]?.year();
  };
  const isInRangeYear = (year: number) => {
    if (!props.isRangeType) {
      return false;
    }
    const isIn =
      rangeSelectDate.value[0] &&
      rangeSelectDate.value[0].year() < year &&
      rangeSelectDate.value[1] &&
      rangeSelectDate.value[1].year() > year;
    return isIn ? true : false;
  };

  const getYearItemCls = (year: number): Record<string, boolean> => {
    return {
      [ns.e('year-item-title')]: true,
      [ns.e('this-year')]: isThisYear(year),
      [ns.e('year-disabled')]: isDisableYear(year),
      [ns.e('year-active')]: isActiveYear(year),
      [ns.e('year-start')]: isStartYear(year),
      [ns.e('year-end')]: isEndYear(year),
      [ns.e('year-in-range')]: isInRangeYear(year),
    };
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
          goToShowYear(date);
        } else {
          selectDate.value = date;
        }
      } else {
        selectDate.value = dateValue;
        if (dateValue) {
          goToShowYear(dateValue);
        }
      }
    },
    { deep: true }
  );

  const handlerSetRangeDate = (year: number) => {
    const date = dayjs(new Date(year, 0, 1)).locale('zh-cn');
    if (props.focusType === 'start') {
      rangeSelectDate.value[0] = date;
    } else if (props.focusType === 'end') {
      rangeSelectDate.value[1] = date;
    }
    fixRangeDate();
  };

  const handlerSelectYear = (year: number) => {
    if (isDisableYear(year)) {
      return;
    }
    selectDate.value = dayjs(new Date(year, 0, 1)).locale('zh-cn');
    if (props.isRangeType) {
      handlerSetRangeDate(year);
    }
    emitSelectedDate();
  };
  return { yarListScrollRef, yearList, getYearItemCls, handlerSelectYear };
}

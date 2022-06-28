import { ref, onBeforeMount, nextTick, watch } from 'vue';
import type { SetupContext } from 'vue';
import { chunk } from 'lodash';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { DatePickerProPanelProps } from '../date-picker-pro-types';
import { yearCalendarItemHeight } from '../const';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import useCalendarCommon from './use-calendar-common';

export default function useYearCalendarPanel(props: DatePickerProPanelProps, ctx: SetupContext): any {
  const ns = useNamespace('date-picker-pro');
  const yarListScrollRef = ref();
  const yearList = ref<number[][]>([]);

  const { today, calendarRange, selectDate, rangeSelectDate, minDate, maxDate, fixRangeDate } = useCalendarCommon(props);

  const initYearList = () => {
    calendarRange.value[0] = props.calendarRange?.[0] || 1970;
    calendarRange.value[1] = props.calendarRange?.[1] || 2099;
    const list = new Array(calendarRange.value[1] - calendarRange.value[0] + 1).fill(1).map((item, i) => i + calendarRange.value[0]);
    yearList.value = chunk(list, 3);
  };

  const goToShowYear = (date: Dayjs) => {
    if (date) {
      const index = Math.floor((date.year() - calendarRange.value[0]) / 3);
      let scrollHeight = (index - 1) * yearCalendarItemHeight;
      if (scrollHeight < 0) {
        scrollHeight = 0;
      }
      nextTick(() => {
        const scrollEl = yarListScrollRef.value;
        scrollEl?.scroll?.(0, scrollHeight);
      });
    }
  };

  const handlerShowPanel = (dateValue: Dayjs | undefined | (Dayjs | undefined)[]) => {
    let toDate: Dayjs | undefined;
    if (Array.isArray(dateValue)) {
      if (dateValue[0]) {
        // 初始化时, 日历面板会默认展示时间范围选择的startDate
        const date = dateValue[0];
        toDate = date;
        rangeSelectDate.value[0] = dateValue[0];
      } else {
        toDate = dayjs(today.value).locale('zh-cn');
      }
      if (dateValue[1]) {
        rangeSelectDate.value[1] = dateValue[1];
      }
    } else if (!Array.isArray(dateValue) && dateValue) {
      toDate = dateValue;
      selectDate.value = dateValue;
    } else {
      toDate = dayjs(today.value).locale('zh-cn');
    }
    if (toDate) {
      goToShowYear(toDate);
    }
  };

  onBeforeMount(() => {
    today.value = new Date();
    initYearList();
    handlerShowPanel(props.dateValue);
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

  const getYearItemCls = (year: number) => {
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
    if (props.isRangeType) {
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
  return { yarListScrollRef, yearList, getYearItemCls, handlerSelectYear };
}

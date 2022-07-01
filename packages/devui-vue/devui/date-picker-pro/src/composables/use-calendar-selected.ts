import { ref, computed } from 'vue';
import type { SetupContext } from 'vue';
import { DatePickerProPanelProps, UseCalendarSelectedReturnType } from '../date-picker-pro-types';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export default function useCalendarSelected(props: DatePickerProPanelProps, ctx: SetupContext): UseCalendarSelectedReturnType {
  const today = ref<Date>(new Date());
  const calendarRange = ref<number[]>([]);
  const selectDate = ref<Dayjs | undefined>();
  const rangeSelectDate = ref<(Dayjs | undefined)[]>([]);

  const minDate = computed(() => {
    if (props.limitDateRange && props.limitDateRange[0]) {
      return props.limitDateRange[0];
    } else {
      return new Date(calendarRange.value[0], 0, 1);
    }
  });
  const maxDate = computed(() => {
    if (props.limitDateRange && props.limitDateRange[1]) {
      return props.limitDateRange[1];
    } else {
      return new Date(calendarRange.value[1], 11, 31);
    }
  });

  // 对时间范围选择模式下，对startDate,endDate做一些修正
  const fixRangeDate = () => {
    const start = rangeSelectDate.value[0]?.toDate()?.getTime();
    const end = rangeSelectDate.value[1]?.toDate()?.getTime();
    if (start && end && end < start) {
      if (props.focusType === 'start') {
        rangeSelectDate.value[1] = undefined;
      } else if (props.focusType === 'end') {
        rangeSelectDate.value[0] = undefined;
      }
    }
  };

  const getToDate = (dateValue: Dayjs | undefined | (Dayjs | undefined)[]) => {
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
    return toDate;
  };

  const emitSelectedDate = () => {
    if (props.isRangeType) {
      if (props.focusType === 'start' && (props.type !== 'date' || (props.type === 'date' && !props.showTime))) {
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

  return {
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
  };
}

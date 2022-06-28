import { ref, computed } from 'vue';
import { DatePickerProPanelProps, UseCalendarCommonReturnType } from '../date-picker-pro-types';
import type { Dayjs } from 'dayjs';

export default function useCalendarCommon(props: DatePickerProPanelProps): UseCalendarCommonReturnType {
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

  return { today, calendarRange, selectDate, rangeSelectDate, minDate, maxDate, fixRangeDate };
}

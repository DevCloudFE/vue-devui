import { ref, computed, watchEffect } from 'vue';
import type { SetupContext } from 'vue';
import { DatePickerProPanelProps, UseDatePickerReturnType } from '../date-picker-pro-types';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export default function useDatePicker(props: DatePickerProPanelProps, ctx: SetupContext): UseDatePickerReturnType {
  const calendarPanelRef = ref();
  const currentDate = ref<Dayjs>();
  const timeData = ref<string>('');

  const getSelectedDate = (date: Dayjs) => {
    //  日期加上时间
    const curDate = date.toDate().toLocaleDateString();
    const curDateTime = `${curDate} ${timeData.value || '00:00:00'}`;
    return dayjs(curDateTime).locale('zh-cn');
  };

  const onSelectedDate = (date: Dayjs) => {
    currentDate.value = date;
    if (!props.showTime) {
      ctx.emit('selectedDate', date, true);
    } else {
      ctx.emit('selectedDate', getSelectedDate(date), false);
    }
  };

  const timeFormat = computed(() => {
    return props.format.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?Y{2,4}/g, '').trim();
  });

  watchEffect(() => {
    if (props.dateValue) {
      const date = Array.isArray(props.dateValue) ? props.dateValue[0] : props.dateValue;
      currentDate.value = date;
      timeData.value = date.format(timeFormat.value);
    }
  });

  const handlerConfirm = () => {
    if (!currentDate.value) {
      return;
    }
    ctx.emit('selectedDate', getSelectedDate(currentDate.value), true);
  };

  const handlerSelectedTime = (time: string) => {
    timeData.value = time;
    if (currentDate.value) {
      ctx.emit('selectedDate', getSelectedDate(currentDate.value), false);
    } else {
      // 如果没有选中日期, 选中时间后默认选中当天时间
      const nowDate = dayjs().locale('zh-cn');
      ctx.emit('selectedDate', getSelectedDate(nowDate), false);
      calendarPanelRef?.value?.updateSelectedDate(nowDate);
    }
  };

  return {
    calendarPanelRef,
    timeData,
    onSelectedDate,
    handlerConfirm,
    handlerSelectedTime,
  };
}

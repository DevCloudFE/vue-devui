import { ref, computed, watch } from 'vue';
import type { SetupContext } from 'vue';
import { DatePickerProPanelProps, UseDatePickerReturnType } from '../date-picker-pro-types';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export default function useDatePicker(props: DatePickerProPanelProps, ctx: SetupContext): UseDatePickerReturnType {
  const calendarPanelRef = ref();
  const currentDate = ref<Dayjs>();
  const currentRangeDate = ref<(Dayjs | null)[]>([]);
  const timeData = ref<string>('');

  const getSelectedDate = (date: Dayjs) => {
    //  日期加上时间
    const curDate = date.toDate().toLocaleDateString();
    const curDateTime = `${curDate} ${timeData.value || '00:00:00'}`;
    return dayjs(curDateTime).locale('zh-cn');
  };

  const getRangeSelectedDate = (date: (Dayjs | null)[]) => {
    // 日期范围加上时间
    const [startDate, endDate] = date;
    if (props.focusType === 'start') {
      const selectStart = startDate ? getSelectedDate(startDate) : startDate;
      return [selectStart, endDate];
    } else {
      const selectEnd = endDate ? getSelectedDate(endDate) : endDate;
      return [startDate, selectEnd];
    }
  };

  const onSelectedDate = (date: Dayjs | Dayjs[]) => {
    if (Array.isArray(date)) {
      currentRangeDate.value = date;
      if (props.focusType === 'start') {
        timeData.value = '00:00:00';
      } else {
        timeData.value = '23:59:59';
      }
      // 时间范围选择模式，在不显示时间时，startDate及endDate同时存在时，关闭面板
      if (!props.showTime) {
        ctx.emit('selectedDate', date, date[0] && date[1] && props.focusType === 'end' ? true : false);
      } else {
        ctx.emit('selectedDate', getRangeSelectedDate(date), false);
      }
    } else {
      currentDate.value = date;
      if (!props.showTime) {
        ctx.emit('selectedDate', date, true);
      } else {
        ctx.emit('selectedDate', getSelectedDate(date), false);
      }
    }
  };

  const timeFormat = computed(() => {
    const format = props.format || 'YYYY/MM/DD';
    return format.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?Y{2,4}/g, '').trim();
  });

  const retDefaultDateValue = () => {
    currentDate.value = undefined;
    timeData.value = '';
  };

  watch(
    [() => props.dateValue, () => props.focusType],
    ([dateValue, focusType]) => {
      if (Array.isArray(dateValue)) {
        if (dateValue[0]) {
          currentRangeDate.value[0] = dateValue[0];
        } else {
          currentRangeDate.value[0] = null;
        }
        if (dateValue[1]) {
          currentRangeDate.value[1] = dateValue[1];
        } else {
          currentRangeDate.value[1] = null;
        }
        let date: Dayjs | undefined;
        if (focusType === 'start') {
          date = dateValue[0];
        } else {
          // 在选择了startDate后，自动聚焦到endStart， 此时面板展示startDate时间
          date = dateValue[1] || dateValue[0];
        }
        if (date) {
          currentDate.value = date;
          timeData.value = date.format(timeFormat.value);
        } else {
          retDefaultDateValue();
        }
      } else if (dateValue) {
        const date = dateValue;
        currentDate.value = date;
        timeData.value = date.format(timeFormat.value);
      } else {
        retDefaultDateValue();
      }
    },
    { immediate: true, deep: true }
  );

  const handlerConfirm = () => {
    if (props.isRangeType) {
      if (props.focusType === 'start') {
        if (!currentRangeDate.value[0]) {
          return;
        }
        ctx.emit('changeRangeFocusType', 'end');
      }
      if (props.focusType === 'end') {
        ctx.emit('selectedDate', getRangeSelectedDate(currentRangeDate.value), true);
      }
    } else {
      if (!currentDate.value) {
        return;
      }
      ctx.emit('selectedDate', getSelectedDate(currentDate.value), true);
    }
  };

  const handlerSelectedTime = (time: string) => {
    timeData.value = time;
    if (props.isRangeType) {
      if (props.focusType === 'start') {
        if (currentRangeDate.value[0]) {
          ctx.emit('selectedDate', getRangeSelectedDate(currentRangeDate.value), false);
        } else {
          // 如果没有选中日期, 选中时间后默认选中当天时间
          const nowDate = dayjs().locale('zh-cn');
          currentRangeDate.value[0] = nowDate;
          ctx.emit('selectedDate', getRangeSelectedDate(currentRangeDate.value), false);
        }
      }
      if (props.focusType === 'end') {
        if (currentRangeDate.value[1]) {
          ctx.emit('selectedDate', getRangeSelectedDate(currentRangeDate.value), false);
        } else {
          currentRangeDate.value[1] = currentRangeDate.value[0];
          ctx.emit('selectedDate', getRangeSelectedDate(currentRangeDate.value), false);
        }
      }
    } else {
      if (currentDate.value) {
        ctx.emit('selectedDate', getSelectedDate(currentDate.value), false);
      } else {
        // 如果没有选中日期, 选中时间后默认选中当天时间
        const nowDate = dayjs().locale('zh-cn');
        ctx.emit('selectedDate', getSelectedDate(nowDate), false);
      }
    }
  };

  const onChangeRangeFocusType = (type: string) => {
    ctx.emit('changeRangeFocusType', type);
  };

  return {
    calendarPanelRef,
    timeData,
    onSelectedDate,
    handlerConfirm,
    handlerSelectedTime,
    onChangeRangeFocusType,
  };
}

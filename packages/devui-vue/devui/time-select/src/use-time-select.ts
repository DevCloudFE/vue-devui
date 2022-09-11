import { computed, SetupContext, ref } from 'vue';
import { TimeSelectProps, useTimeSelectFn, Time, TimeListType } from './time-select-types';

export function useTimeSelect(props: TimeSelectProps, ctx: SetupContext): useTimeSelectFn {
  const select = ref();
  const padTime = (time: number | string) => {
    return `${time}`.padStart(2, '0');
  };

  const parseTimeToNumber = (time: string): null | Time => {
    const timeArr = (time || '').split(':');
    if (timeArr.length < 2) {
      return null;
    }
    const hour = Number.parseInt(timeArr[0], 10);
    const minute = Number.parseInt(timeArr[1], 10);
    return {
      hour,
      minute,
    };
  };

  const formatTime = (time: Time) => {
    return `${padTime(time.hour)}:${padTime(time.minute)}`;
  };

  const nextTime = (time: string, step: string): string => {
    const timeValue = parseTimeToNumber(time);
    const stepValue = parseTimeToNumber(step);
    const nextTimeObj: Time = {
      hour: timeValue.hour,
      minute: timeValue.minute,
    };
    nextTimeObj.minute += stepValue.minute;
    nextTimeObj.hour += stepValue.hour;
    nextTimeObj.hour += Math.floor(nextTimeObj.minute / 60);
    nextTimeObj.minute = nextTimeObj.minute % 60;
    return formatTime(nextTimeObj);
  };

  const start = computed(() => {
    const startTime = parseTimeToNumber(props.start);
    return startTime ? formatTime(startTime) : '00:00';
  });

  const end = computed(() => {
    const endTime = parseTimeToNumber(props.end);
    return endTime ? formatTime(endTime) : '24:00';
  });

  const step = computed(() => {
    const stepTime = parseTimeToNumber(props.step);
    if (stepTime && stepTime.hour >= 0 && stepTime.minute >= 0 && stepTime.hour + stepTime.minute > 0) {
      return formatTime(stepTime);
    }
    return '00:30';
  });

  const minTime = computed(() => {
    const min = parseTimeToNumber(props.minTime);
    return min ? formatTime(min) : null;
  });

  const maxTime = computed(() => {
    const max = parseTimeToNumber(props.maxTime);
    return max ? formatTime(max) : null;
  });

  const compareTime = (time1: string, time2: string): number => {
    const time1Obj = parseTimeToNumber(time1);
    const time2Obj = parseTimeToNumber(time2);
    const minutes01 = time1Obj.minute + time1Obj.hour * 60;
    const minutes02 = time2Obj.minute + time2Obj.hour * 60;
    if (minutes01 === minutes02) {
      return 0;
    }
    return minutes01 > minutes02 ? 1 : -1;
  };

  const options = computed(() => {
    const list = [];
    if (props.start && props.end && props.step) {
      let current = start.value;
      let currentTime;
      while (compareTime(current, end.value) <= 0) {
        currentTime = current;
        list.push({
          value: currentTime,
          name: currentTime,
          disabled: compareTime(current, minTime.value || '-1:-1') < 0 || compareTime(current, maxTime.value || '24:00') > 0,
        });
        current = nextTime(current, step.value);
      }
    }
    return list;
  });

  const changeData = (data: TimeListType) => {
    ctx.emit('update:modelValue', data.value);
    ctx.emit('change', data.value);
  };

  const clearData = (value: string) => {
    ctx.emit('update:modelValue', value);
  };

  const focusFun = (e: FocusEvent) => {
    ctx.emit('focus', e);
  };

  const blurFun = (e: FocusEvent) => {
    ctx.emit('blur', e);
  };

  return {
    options,
    changeData,
    select,
    clearData,
    focusFun,
    blurFun,
  };
}

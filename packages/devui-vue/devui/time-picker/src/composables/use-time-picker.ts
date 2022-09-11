import { Ref, ref, computed } from 'vue';
import { TimeObj, UseTimerPickerFn, popupTimeObj } from '../types';
import { TimePickerProps } from '../time-picker-types';
import { onClickOutside } from '@vueuse/core';

export default function useTimePicker(hh: Ref, mm: Ref, ss: Ref, format: string, props: TimePickerProps): UseTimerPickerFn {
  const showPopup = ref(false);
  const inputDom = ref();
  const overlayRef = ref<HTMLElement>();
  const timePopupDom = ref();
  const timePickerValue = ref('');
  const showClearIcon = ref(false);
  const firsthandActiveTime = ref(`${hh.value}:${mm.value}:${ss.value}`);
  const vModeValue = ref(props.modelValue);

  const formatTime = () => {
    let modelValue = vModeValue.value || '00:00:00';
    if (['hh:mm', 'mm:ss'].includes(format)) {
      modelValue = vModeValue.value || '00:00';
    }
    const timeArr = modelValue.split(':');
    let trueValue = '00:00:00';
    if (format === 'hh:mm:ss') {
      trueValue = modelValue;
    } else if (format === 'mm:hh:ss') {
      trueValue = `${timeArr[1]}:${timeArr[0]}:${timeArr[2]}`;
    } else if (format === 'hh:mm') {
      trueValue = `${timeArr[0]}:${timeArr[1]}`;
    } else if (format === 'mm:ss') {
      trueValue = `${timeArr[0]}:${timeArr[1]}`;
    }
    return trueValue;
  };
  const trueTimeValue = computed(() => {
    return formatTime();
  });

  const setInputValue = (h: string, m: string, s: string) => {
    if (format === 'hh:mm:ss') {
      vModeValue.value = `${h}:${m}:${s}`;
    } else if (format === 'mm:hh:ss') {
      vModeValue.value = `${m}:${h}:${s}`;
    } else if (format === 'hh:mm') {
      vModeValue.value = `${h}:${m}`;
    } else if (format === 'mm:ss') {
      vModeValue.value = `${m}:${s}`;
    }
  };
  const initData = () => {
    if (vModeValue.value) {
      firsthandActiveTime.value = props.modelValue;
      const time = vModeValue.value.split(':');
      setInputValue(time[0], time[1], time[2]);
    }
  };
  initData();

  const changeTimeData = ({ activeHour, activeMinute, activeSecond }: popupTimeObj) => {
    hh.value = activeHour.value || '00';
    mm.value = activeMinute.value || '00';
    ss.value = activeSecond.value || '00';
    firsthandActiveTime.value = `${hh.value}:${mm.value}:${ss.value}`;
    setInputValue(hh.value, mm.value, ss.value);
  };

  const mouseInputFun = () => {
    if (!vModeValue.value) {
      vModeValue.value = '00:00:00';
    }
    const minTimeValueArr = props.minTime.split(':');
    const maxTimeValueArr = props.maxTime.split(':');

    if (vModeValue.value > props.maxTime) {
      firsthandActiveTime.value = props.maxTime;
      setInputValue(maxTimeValueArr[0], maxTimeValueArr[1], maxTimeValueArr[2]);
    } else if (vModeValue.value < props.minTime) {
      firsthandActiveTime.value = props.minTime;
      setInputValue(minTimeValueArr[0], minTimeValueArr[1], minTimeValueArr[2]);
    }
    showPopup.value = true;
  };

  const clickVerifyFun = () => {
    if (props.disabled || props.readonly) {
      return;
    }
    mouseInputFun();
  };

  onClickOutside(
    overlayRef,
    () => {
      showPopup.value = false;
    },
    { ignore: [inputDom] }
  );

  const clearAll = (e: MouseEvent) => {
    e.stopPropagation();

    if (props.minTime !== '00:00:00') {
      const minTimeArr = props.minTime.split(':');
      hh.value = minTimeArr[0];
      mm.value = minTimeArr[1];
      ss.value = minTimeArr[2];
    } else {
      hh.value = '00';
      mm.value = '00';
      ss.value = '00';
    }
    firsthandActiveTime.value = `${hh.value}:${mm.value}:${ss.value}`;
    setInputValue(hh.value, mm.value, ss.value);
  };

  const isOutOpen = () => {
    if (props.autoOpen) {
      mouseInputFun();
      showPopup.value = props.autoOpen;
    }
  };

  // slot -- 选择时间
  const chooseTime = (slotTime: TimeObj) => {
    if (slotTime.type) {
      if (slotTime.type.toLowerCase() === 'hh') {
        hh.value = slotTime.time;
      } else if (slotTime.type.toLowerCase() === 'mm') {
        mm.value = slotTime.time;
      } else if (slotTime.type.toLowerCase() === 'ss') {
        ss.value = slotTime.time;
      }
      firsthandActiveTime.value = `${hh.value}:${mm.value}:${ss.value}`;
      setInputValue(hh.value, mm.value, ss.value);
    } else {
      const timeArr = slotTime.time.split(':');
      hh.value = timeArr[0];
      mm.value = timeArr[1];
      ss.value = timeArr[2];
      firsthandActiveTime.value = `${hh.value}:${mm.value}:${ss.value}`;
      setInputValue(hh.value, mm.value, ss.value);
    }
  };

  return {
    showPopup,
    trueTimeValue,
    timePickerValue,
    inputDom,
    timePopupDom,
    showClearIcon,
    firsthandActiveTime,
    vModeValue,
    clickVerifyFun,
    isOutOpen,
    clearAll,
    chooseTime,
    overlayRef,
    changeTimeData,
  };
}

import { shallowRef, ref, computed, inject, watch } from 'vue';
import type { SetupContext } from 'vue';
import { RangeDatePickerProProps, UseRangePickerProReturnType } from '../range-date-picker-types';
import { onClickOutside } from '@vueuse/core';
import type { Dayjs } from 'dayjs';
import { formatDayjsToStr, isDateEquals, parserDate } from '../utils';
import { FORM_ITEM_TOKEN, FORM_TOKEN } from '../../../form';

export default function useRangePickerPro(props: RangeDatePickerProProps, ctx: SetupContext): UseRangePickerProReturnType {
  const formContext = inject(FORM_TOKEN, undefined);
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined);

  const originRef = ref<HTMLElement>();
  const startInputRef = shallowRef<HTMLElement>();
  const endInputRef = shallowRef<HTMLElement>();
  const overlayRef = shallowRef<HTMLElement>();
  const isPanelShow = ref<boolean>(false);
  const placeholder = computed(() => props.placeholder);
  const isMouseEnter = ref<boolean>(false);
  const focusType = ref<string>('start');

  const pickerDisabled = computed(() => formContext?.disabled || props.disabled);
  const pickerSize = computed(() => formContext?.size || props.size);
  const isValidateError = computed(() => formItemContext?.validateState === 'error');

  const toggleChange = (isShow: boolean) => {
    isPanelShow.value = isShow;
    ctx.emit('toggleChange', isShow);
    if (!isShow) {
      ctx.emit('blur');
    }
  };

  onClickOutside(
    overlayRef,
    () => {
      toggleChange(false);
    },
    { ignore: [originRef] }
  );

  const focusHandler = function (e: MouseEvent) {
    ctx.emit('focus', e);
  };

  const format = computed(() => {
    return props.showTime ? props.format || 'YYYY/MM/DD HH:mm:ss' : props.format || 'YYYY/MM/DD';
  });

  const dateValue = computed(() => {
    let start;
    let end;
    if (props.modelValue[0]) {
      start = parserDate(props.modelValue[0]);
    }
    if (props.modelValue[1]) {
      end = parserDate(props.modelValue[1]);
    }
    return [start, end];
  });

  const displayDateValue = computed(() => {
    const startFormatDate = formatDayjsToStr(dateValue.value[0], format.value, props.type);
    const endFormatDate = formatDayjsToStr(dateValue.value[1], format.value, props.type);
    if (startFormatDate) {
      return endFormatDate ? [startFormatDate, endFormatDate] : [startFormatDate, ''];
    } else if (endFormatDate) {
      return startFormatDate ? [startFormatDate, endFormatDate] : ['', endFormatDate];
    }
    return ['', ''];
  });

  const showCloseIcon = computed(() => isMouseEnter.value && (displayDateValue.value[0] !== '' || displayDateValue.value[1] !== ''));

  const onSelectedDate = (date: Dayjs[], isConfirm?: boolean) => {
    const [startDate, endDate] = date;
    const selectStart = startDate ? startDate.toDate() : startDate;
    const selectEnd = endDate ? endDate.toDate() : endDate;
    const [start, end] = props.modelValue;
    if (!isDateEquals(start, selectStart) || !isDateEquals(end, selectEnd)) {
      ctx.emit('update:modelValue', [selectStart ? selectStart : '', selectEnd ? selectEnd : '']);
    }
    if (isConfirm) {
      // 回调参数为Date类型
      ctx.emit('confirmEvent', [selectStart ? selectStart : '', selectEnd ? selectEnd : '']);
      toggleChange(false);
    }
  };

  const onChangeRangeFocusType = (type: string) => {
    focusType.value = type;
    if (focusType.value === 'start') {
      setTimeout(() => {
        startInputRef.value?.focus();
      });
    } else {
      setTimeout(() => {
        endInputRef.value?.focus();
      });
    }
  };

  const handlerClearTime = (e: MouseEvent) => {
    if (!showCloseIcon.value) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    ctx.emit('update:modelValue', ['', '']);
    ctx.emit('confirmEvent', ['', '']);
    // 当面板未关闭时，清空后focusType置位start
    if (isPanelShow.value) {
      onChangeRangeFocusType('start');
    }
  };

  ctx.expose({
    focusChange: onChangeRangeFocusType,
  });

  const onFocus = function (type: string) {
    if (!isPanelShow.value) {
      type = 'start';
    }
    onChangeRangeFocusType(type);
    toggleChange(true);
  };

  watch(
    () => props.modelValue,
    () => {
      formItemContext?.validate('change').catch((err) => console.warn(err));
    },
    { deep: true }
  );

  return {
    originRef,
    startInputRef,
    endInputRef,
    overlayRef,
    isPanelShow,
    placeholder,
    format,
    dateValue,
    displayDateValue,
    isMouseEnter,
    showCloseIcon,
    focusType,
    pickerDisabled,
    pickerSize,
    isValidateError,
    onFocus,
    focusHandler,
    onSelectedDate,
    handlerClearTime,
    onChangeRangeFocusType,
  };
}

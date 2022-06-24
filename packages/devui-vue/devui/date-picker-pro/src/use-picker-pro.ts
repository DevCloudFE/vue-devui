import { shallowRef, ref, computed } from 'vue';
import type { SetupContext } from 'vue';
import { DatePickerProProps, UseDatePickerProReturnType } from './date-picker-pro-types';
import { onClickOutside } from '@vueuse/core';
import type { Dayjs } from 'dayjs';
import { formatDayjsToStr, isDateEquals, parserDate } from './utils';

export default function usePickerPro(props: DatePickerProProps, ctx: SetupContext): UseDatePickerProReturnType {
  const containerRef = shallowRef<HTMLElement>();
  const originRef = ref<HTMLElement>();
  const inputRef = shallowRef<HTMLElement>();
  const overlayRef = shallowRef<HTMLElement>();
  const isPanelShow = ref(false);
  const placeholder = computed(() => props.placeholder);
  const isMouseEnter = ref(false);

  const toggleChange = (bool: boolean) => {
    isPanelShow.value = bool;
    ctx.emit('toggleChange', bool);
    if (!bool) {
      ctx.emit('blur');
    }
  };

  onClickOutside(containerRef, () => {
    toggleChange(false);
  });

  const onFocus = function (e: MouseEvent) {
    e.stopPropagation();
    toggleChange(true);
    ctx.emit('focus', e);
  };

  const format = computed(() => {
    return props.showTime ? props.format || 'YYYY/MM/DD HH:mm:ss' : props.format || 'YYYY/MM/DD';
  });

  const dateValue = computed(() => {
    let result;
    if (props.modelValue) {
      result = parserDate(props.modelValue);
    }
    return result;
  });

  const displayDateValue = computed(() => {
    const formatDate = formatDayjsToStr(dateValue.value, format.value);
    if (formatDate) {
      return formatDate;
    }
    return '';
  });

  const showCloseIcon = computed(() => isMouseEnter.value && (props.modelValue ? true : false));

  const onSelectedDate = (date: Dayjs, isConfirm?: boolean) => {
    const result = date ? date.toDate() : date;
    if (!isDateEquals(props.modelValue, result)) {
      ctx.emit('update:modelValue', result ? result : '');
    }
    if (isConfirm) {
      ctx.emit('confirmEvent', result ? result : '');
      toggleChange(false);
    }
  };

  const handlerClearTime = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    ctx.emit('update:modelValue', '');
    ctx.emit('confirmEvent', '');
  };

  return {
    containerRef,
    originRef,
    inputRef,
    overlayRef,
    isPanelShow,
    placeholder,
    format,
    dateValue,
    displayDateValue,
    isMouseEnter,
    showCloseIcon,
    onFocus,
    onSelectedDate,
    handlerClearTime,
  };
}

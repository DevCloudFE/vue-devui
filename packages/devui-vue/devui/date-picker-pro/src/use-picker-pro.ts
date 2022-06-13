import { shallowRef, ref, computed } from 'vue';
import type { SetupContext } from 'vue';
import { DatePickerProProps, UseDatePickerProReturnType } from './date-picker-pro-types';
import { onClickOutside } from '@vueuse/core';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { isEmpty } from 'lodash';

export default function usePickerPro(props: DatePickerProProps, ctx: SetupContext): UseDatePickerProReturnType {
  const containerRef = shallowRef<HTMLElement>();
  const originRef = ref<HTMLElement>();
  const inputRef = shallowRef<HTMLElement>();
  const overlayRef = shallowRef<HTMLElement>();
  const isPanelShow = ref(false);
  const placeholder = computed(() => props.placeholder);

  const toggleChange = (bool: boolean) => {
    isPanelShow.value = bool;
    ctx.emit('toggleChange', bool);
  };

  onClickOutside(containerRef, () => {
    toggleChange(false);
  });

  const onFocus = function (e: MouseEvent) {
    e.stopPropagation();
    toggleChange(true);
  };

  const parserDate = (date: string | number | Date, format: string): Dayjs | undefined => {
    const day = isEmpty(format) || format === 'x' ? dayjs(date).locale('zh-cn') : dayjs(date, format).locale('zh-cn');
    return day.isValid() ? day : undefined;
  };

  const dateValue = computed(() => {
    let result;
    if (props.modelValue) {
      result = parserDate(props.modelValue, props.format);
    }
    return result;
  });

  const formatDayjsToStr = (date: Dayjs | undefined) => {
    if (!date) {
      return null;
    }
    return date.format(props.format);
  };

  const displayDateValue = computed(() => {
    const formatDate = formatDayjsToStr(dateValue.value);
    if (formatDate) {
      return formatDate;
    }
    return '';
  });

  const isDateEquals = (pre: Date | any, cur: Date | any) => {
    const preDate = pre instanceof Date;
    const curDate = cur instanceof Date;
    return preDate && curDate ? pre.getTime() === cur.getTime() : pre === cur;
  };

  const getFormatterDate = (date: Dayjs, format: string) => {
    if (format === 'x') {
      return +date;
    }
    return dayjs(date).locale('zh-cn').format(format);
  };

  const onSelectedDate = (date: Dayjs, isConfirm?: boolean) => {
    const result = date ? date.toDate() : date;
    if (!isDateEquals(props.modelValue, result)) {
      const formatDate = getFormatterDate(date, props.format);
      ctx.emit('update:modelValue', date ? formatDate : date);
      if (isConfirm) {
        ctx.emit('confirmEvent', date);
        toggleChange(false);
      }
    }
  };

  return { containerRef, originRef, inputRef, overlayRef, isPanelShow, placeholder, dateValue, displayDateValue, onFocus, onSelectedDate };
}

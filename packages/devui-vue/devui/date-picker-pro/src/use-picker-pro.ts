import { shallowRef, ref, computed, inject, watch, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import { DatePickerProProps, UseDatePickerProReturnType } from './date-picker-pro-types';
import { onClickOutside } from '@vueuse/core';
import type { Dayjs } from 'dayjs';
import { debounce } from 'lodash';
import { formatDayjsToStr, isDateEquals, parserDate, isInputDateValid } from './utils';
import { FORM_ITEM_TOKEN, FORM_TOKEN } from '../../form';

export default function usePickerPro(
  props: DatePickerProProps,
  ctx: SetupContext,
  t: (path: string) => unknown,
  commonT: (path: string) => string
): UseDatePickerProReturnType {
  const formContext = inject(FORM_TOKEN, undefined);
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined);
  const { calendarRange, limitDateRange, allowClear } = toRefs(props)

  const originRef = ref<HTMLElement>();
  const inputRef = shallowRef<HTMLElement>();
  const overlayRef = shallowRef<HTMLElement>();
  const isPanelShow = ref(false);
  const placeholder = computed(() => props.placeholder || (t('placeholder') as string));
  const isMouseEnter = ref(false);

  const pickerDisabled = computed(() => formContext?.disabled || props.disabled);
  const pickerSize = computed(() => formContext?.size || props.size);
  const isValidateError = computed(() => formItemContext?.validateState === 'error');

  const toggle = () => {
    toggleChange(!isPanelShow.value)
  }

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

  const onFocus = function (e: MouseEvent) {
    toggleChange(true);
    ctx.emit('focus', e);
  };
  const langMap: Record<string, string> = {
    'zh-cn': 'YYYY/MM/DD',
    'en-us': 'MMM DD, YYYY'
  }
  const langTimeMap: Record<string, string> = {
    'zh-cn': 'YYYY/MM/DD HH:mm:ss',
    'en-us': 'MMM DD, YYYY HH:mm:ss'
  }
  const format = computed(() => {
    return props.showTime ? props.format || langTimeMap[commonT('lang')] : props.format || langMap[commonT('lang')];
  });

  const dateValue = computed(() => {
    let result;
    if (props.modelValue) {
      result = parserDate(props.modelValue);
    }
    return result;
  });

  const displayDateValue = computed(() => {
    const formatDate = formatDayjsToStr(dateValue.value, format.value, props.type, commonT('lang'));
    if (formatDate) {
      return formatDate;
    }
    return '';
  });

  const showCloseIcon = computed(
    () => !pickerDisabled.value && isMouseEnter.value && (props.modelValue ? true : false) && allowClear.value
  );

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
    if (!showCloseIcon.value) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    ctx.emit('update:modelValue', '');
    ctx.emit('confirmEvent', '');
    if (isPanelShow.value) {
      setTimeout(() => {
        inputRef.value?.focus();
      });
    }
  };

  const onInputChange = debounce((val: string) => {
    isInputDateValid(val, format.value, calendarRange.value, limitDateRange?.value, (validDate: string) => {
      ctx.emit('update:modelValue', validDate)
    });
  }, 300);

  watch(
    () => props.modelValue,
    () => {
      formItemContext?.validate('change').catch(() => { });
    },
    { deep: true }
  );

  return {
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
    pickerDisabled,
    pickerSize,
    isValidateError,
    onFocus,
    onSelectedDate,
    handlerClearTime,
    onInputChange,
    toggle,
  };
}

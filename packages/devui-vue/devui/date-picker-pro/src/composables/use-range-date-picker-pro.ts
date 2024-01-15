import { shallowRef, ref, computed, inject, getCurrentInstance, watch, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import { RangeDatePickerProProps, UseRangePickerProReturnType } from '../range-date-picker-types';
import { onClickOutside } from '@vueuse/core';
import type { Dayjs } from 'dayjs';
import { debounce } from '@devui/shared'
import { formatDayjsToStr, isDateEquals, parserDate, isInputDateValid } from '../utils';
import { FORM_ITEM_TOKEN, FORM_TOKEN } from '../../../form';
import { createI18nTranslate } from '../../../locale/create';

export default function useRangePickerPro(props: RangeDatePickerProProps, ctx: SetupContext): UseRangePickerProReturnType {
  const formContext = inject(FORM_TOKEN, undefined);
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined);
  const { calendarRange, limitDateRange, allowClear } = toRefs(props);
  const app = getCurrentInstance()
  const t = createI18nTranslate('DCommon', app)

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

  const focusHandler = function (e: MouseEvent) {
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
    return props.showTime ? props.format || langTimeMap[t('lang')] : props.format || langMap[t('lang')];
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
    const startFormatDate = formatDayjsToStr(dateValue.value[0], format.value, props.type, t('lang'));
    const endFormatDate = formatDayjsToStr(dateValue.value[1], format.value, props.type, t('lang'));
    if (startFormatDate) {
      return endFormatDate ? [startFormatDate, endFormatDate] : [startFormatDate, ''];
    } else if (endFormatDate) {
      return startFormatDate ? [startFormatDate, endFormatDate] : ['', endFormatDate];
    }
    return ['', ''];
  });


  const showCloseIcon = computed(
    () =>
      !pickerDisabled.value &&
      isMouseEnter.value &&
      (displayDateValue.value[0] !== '' || displayDateValue.value[1] !== '') &&
      allowClear.value
  );

  const onSelectedDate = (date: Dayjs[], isConfirm?: boolean) => {
    const [startDate, endDate] = date;
    const selectStart = startDate ? startDate.toDate() : startDate;
    const selectEnd = endDate ? endDate.toDate() : endDate;
    const [start, end] = props.modelValue;
    const temp: any[] = []
    if (selectStart) {
      temp.push(selectStart)
      if (selectEnd) {
        temp.push(selectEnd)
      }
    } else if (selectEnd) {
      temp.push('')
      temp.push(selectEnd)
    }
    if (!isDateEquals(start, selectStart) || !isDateEquals(end, selectEnd)) {
      ctx.emit('update:modelValue', temp);
    }
    if (isConfirm) {
      // 回调参数为Date类型
      ctx.emit('confirmEvent', temp);
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
    ctx.emit('update:modelValue', []);
    ctx.emit('confirmEvent', []);
    // 当面板未关闭时，清空后focusType置位start
    if (isPanelShow.value) {
      onChangeRangeFocusType('start');
    }
  };

  ctx.expose({
    toggle,
    focusChange: onChangeRangeFocusType,
  });

  const onFocus = function (type: string) {
    if (!isPanelShow.value) {
      type = 'start';
    }
    onChangeRangeFocusType(type);
    toggleChange(true);
  };
  const onStartInputChange = debounce((val: string, type: 'start' | 'end') => {
    isInputDateValid(val, format.value, calendarRange.value, limitDateRange?.value, (validDate: string) => {
      const currentDate = [...props.modelValue];
      if (type === 'start') {
        currentDate[0] = validDate;
      } else {
        currentDate[0] = currentDate[0] ?? '';
        currentDate[1] = validDate;
      }
      ctx.emit('update:modelValue', currentDate)
    });
  }, 300);

  watch(isPanelShow, (show) => {
    if (!show) {
      formItemContext?.validate('blur').catch(() => { })
    }
  });

  watch(
    () => props.modelValue,
    () => {
      formItemContext?.validate('change').catch(() => { });
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
    onStartInputChange,
  };
}

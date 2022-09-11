import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue';
import type { Dayjs } from 'dayjs';
import { datePickerProCommonProps } from './date-picker-pro-types';

export const rangeDatePickerProProps = {
  modelValue: {
    type: Array as PropType<(Date | string)[]>,
    default: ['', ''],
  },
  placeholder: {
    type: Array as PropType<string[]>,
    default: ['', ''],
  },
  separator: {
    type: String,
    default: '-',
  },
  ...datePickerProCommonProps,
} as const;

export type RangeDatePickerProProps = ExtractPropTypes<typeof rangeDatePickerProProps>;

export interface UseRangePickerProReturnType {
  originRef: Ref<HTMLElement | undefined>;
  startInputRef: Ref<HTMLElement | undefined>;
  endInputRef: Ref<HTMLElement | undefined>;
  overlayRef: Ref<HTMLElement | undefined>;
  isPanelShow: Ref<boolean>;
  placeholder: ComputedRef<string[]>;
  format: ComputedRef<string>;
  dateValue: ComputedRef<(Dayjs | undefined)[]>;
  displayDateValue: ComputedRef<string[]>;
  isMouseEnter: Ref<boolean>;
  showCloseIcon: ComputedRef<boolean>;
  focusType: Ref<string>;
  pickerDisabled: ComputedRef<boolean>;
  pickerSize: ComputedRef<'sm' | 'md' | 'lg'>;
  isValidateError: ComputedRef<boolean>;
  onFocus: (type: string) => void;
  focusHandler: (e: MouseEvent) => void;
  onSelectedDate: (date: Dayjs[], isConfirm?: boolean) => void;
  handlerClearTime: (e: MouseEvent) => void;
  onChangeRangeFocusType: (type: string) => void;
}

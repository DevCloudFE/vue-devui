import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue';
import type { Dayjs } from 'dayjs';
import type { InputSize } from '../../input/src/input-types';

export const rangeDatePickerProProps = {
  modelValue: {
    type: Array as PropType<(Date | string)[]>,
    default: ['', ''],
  },
  format: {
    type: String,
  },
  placeholder: {
    type: Array as PropType<string[]>,
    default: ['请选择日期', '请选择日期'],
  },
  showTime: {
    type: Boolean,
    default: false,
  },
  separator: {
    type: String,
    default: '-',
  },
  size: {
    type: String as PropType<InputSize>,
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;

export type RangeDatePickerProProps = ExtractPropTypes<typeof rangeDatePickerProProps>;

export interface UseRangePickerProReturnType {
  containerRef: Ref<HTMLElement | undefined>;
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
  pickerSize: ComputedRef<string>;
  isValidateError: ComputedRef<boolean>;
  onFocus: (type: string) => void;
  focusHandler: (e: MouseEvent) => void;
  onSelectedDate: (date: Dayjs[], isConfirm?: boolean) => void;
  handlerClearTime: (e: MouseEvent) => void;
  onChangeRangeFocusType: (type: string) => void;
}

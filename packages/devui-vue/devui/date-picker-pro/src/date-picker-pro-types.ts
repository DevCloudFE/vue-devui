import type { ExtractPropTypes, PropType, Ref } from 'vue';

export const datePickerProProps = {
  modelValue: {
    type: [Date, String, Number] as PropType<number | string | Date>,
    default: '',
  },
  format: {
    type: String,
    default: 'y/MM/dd',
  },
  placeholder: {
    type: String,
    default: '请选择日期',
  },
} as const;

export type DatePickerProProps = ExtractPropTypes<typeof datePickerProProps>;

export interface datePickerProState {
  show: boolean;
  value: string;
  placeholder: string;
}

export interface UseDatePickerProReturnType {
  containerRef: Ref<HTMLElement | undefined>;
  originRef: Ref<HTMLElement | undefined>;
  inputRef: Ref<HTMLElement | undefined>;
  overlayRef: Ref<HTMLElement | undefined>;
  state: datePickerProState;
  onFocus: (e: MouseEvent) => void;
}

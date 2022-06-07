import type { ExtractPropTypes, PropType, Ref } from 'vue';

export const pickerProProps = {
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

export type PickerProProps = ExtractPropTypes<typeof pickerProProps>;

export interface pickerProState {
  show: boolean;
  value: string;
  placeholder: string;
}

export interface UseDatePickerProReturnType {
  containerRef: Ref<HTMLElement | undefined>;
  originRef: Ref<HTMLElement | undefined>;
  inputRef: Ref<HTMLElement | undefined>;
  overlayRef: Ref<HTMLElement | undefined>;
  state: pickerProState;
  onFocus: (e: MouseEvent) => void;
}

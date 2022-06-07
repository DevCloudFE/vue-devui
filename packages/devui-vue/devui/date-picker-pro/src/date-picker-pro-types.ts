import type { ExtractPropTypes, PropType } from 'vue';

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

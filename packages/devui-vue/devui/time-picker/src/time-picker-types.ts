import { ExtractPropTypes, PropType } from 'vue';
import { sizeType } from './types';

export const timePickerProps = {
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '00:00:00',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  timePickerWidth: {
    type: Number,
    default: 212,
  },
  minTime: {
    type: String,
    default: '00:00:00',
    // 默认时间优先级：minTime > modelValue
  },
  maxTime: {
    type: String,
    default: '23:59:59',
  },
  format: {
    type: String,
    default: 'hh:mm:ss',
  },
  autoOpen: {
    type: Boolean,
    default: false,
  },
  showAnimation: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String as PropType<sizeType>
  },
  readonly: {
    type: Boolean,
    default: false,
  },
} as const;

export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>;

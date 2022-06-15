import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue';
import type { Dayjs } from 'dayjs';

export const rangeDatePickerProProps = {
  modelValue: {
    type: [Array] as PropType<(number | string | Date)[]>,
    default: '',
  },
  format: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  placeholder: {
    type: Array,
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
} as const;

export type RangeDatePickerProProps = ExtractPropTypes<typeof rangeDatePickerProProps>;

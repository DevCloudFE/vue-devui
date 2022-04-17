import { ExtractPropTypes, PropType } from 'vue';

type RateStatusType = PropType<'success' | 'warning' | 'error'>;

export const rateProps = {
  modelValue: {
    type: Number,
    default: 0,
  },
  read: {
    type: Boolean,
    default: false,
  },
  count: {
    type: Number,
    default: 5,
  },
  type: {
    type: String as RateStatusType,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  character: {
    type: String,
    default: '',
  },
  allowHalf: {
    type: Boolean,
    default: false,
  },
  onChange: {
    type: Function as PropType<(value: number) => void>,
    default: undefined,
  },
  onTouched: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
} as const;

export type RateProps = ExtractPropTypes<typeof rateProps>;

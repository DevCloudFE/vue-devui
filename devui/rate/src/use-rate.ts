import { PropType } from 'vue';

export const rateProps = {
  value: {
    type: Number,
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
    type: String as PropType<'success' | 'warning' | 'error'>,
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
  onChange: {
    type: Function as PropType<(value: number) => void>,
    default: undefined,
  },
  onTouched: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
};

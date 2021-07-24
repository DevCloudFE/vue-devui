import { PropType } from 'vue';

export const inputProps = {
  placeholder: {
    type: String,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'sm' | '' | 'lg'>,
    default: ''
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  },
  'onUpdate:value': {
    type: Function as PropType<(v: string) => void>,
    default: undefined
  },
  'onChange': {
    type: Function as PropType<(v: string) => void>,
    default: undefined
  },
  'onKeydown': {
    type: Function as PropType<(v: KeyboardEvent) => void>,
    default: undefined
  },
  'onFocus': {
    type: Function as PropType<() => void>,
    default: undefined
  },
  'onBlur': {
    type: Function as PropType<() => void>,
    default: undefined
  }
} as const;

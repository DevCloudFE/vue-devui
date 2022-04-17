import type { PropType, ExtractPropTypes } from 'vue';

export const inputNumberProps = {
  placeholder: {
    type: String,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  step:{
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: Infinity
  },
  min: {
    type: Number,
    default: -Infinity
  },
  size: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Number,
    default: 0
  },
  'onUpdate:modelValue': {
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

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>;

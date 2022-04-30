import type { ExtractPropTypes, PropType } from 'vue';

export const switchProps = {
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md'
  },
  color: {
    type: String,
    default: undefined
  },
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  beforeChange: {
    type: Function as PropType<(v: boolean) => boolean | Promise<boolean>>,
    default: undefined
  },
  change: {
    type: Function as PropType<(v: boolean) => void>,
    default: undefined
  },
  'onUpdate:checked': {
    type: Function as PropType<(v: boolean) => void>,
    default: undefined
  }
} as const;

export type SwitchProps = ExtractPropTypes<typeof switchProps>;

import type { ExtractPropTypes, PropType, ComputedRef } from 'vue';

export const switchProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md',
  },
  color: {
    type: String,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  beforeChange: {
    type: Function as PropType<(v: boolean) => boolean | Promise<boolean>>,
    default: undefined,
  },
  change: {
    type: Function as PropType<(v: boolean) => void>,
    default: undefined,
  },
} as const;

export type SwitchProps = ExtractPropTypes<typeof switchProps>;

export type UseSwitchFn = {
  checked: ComputedRef<boolean>;
  toggle: () => void;
};

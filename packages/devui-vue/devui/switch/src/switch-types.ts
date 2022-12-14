import type { ExtractPropTypes, PropType, ComputedRef } from 'vue';

export type SwitchSize = 'sm' | 'md' | 'lg';

export const switchProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: false,
  },
  size: {
    type: String as PropType<SwitchSize>
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
  activeValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: true,
  },
  inactiveValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: false,
  },
} as const;

export type SwitchProps = ExtractPropTypes<typeof switchProps>;

export type UseSwitchFn = {
  checked: ComputedRef<string | number | boolean>;
  switchDisabled: ComputedRef<boolean>;
  switchSize: ComputedRef<SwitchSize>;
  toggle: () => void;
};

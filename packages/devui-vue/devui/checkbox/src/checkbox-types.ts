import { PropType, InjectionKey, Ref, ExtractPropTypes } from 'vue';

type Direction = 'row' | 'column';

const commonProps = {
  name: {
    type: String,
    default: undefined,
  },
  halfchecked: {
    type: Boolean,
    default: false,
  },
  isShowTitle: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
  },
  color: {
    type: String,
    default: undefined,
  },
  showAnimation: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  beforeChange: {
    type: Function as PropType<
    (isChecked: boolean, v: string) => boolean | Promise<boolean>
    >,
    default: undefined,
  },
} as const;

export const checkboxProps = {
  ...commonProps,
  halfchecked: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
  },
  label: {
    type: String,
    default: undefined,
  },
  title: {
    type: String,
    default: undefined,
  },
  'onUpdate:checked': {
    type: Function as PropType<(v: boolean) => void>,
    default: undefined,
  },
  onChange: {
    type: Function as PropType<(v: boolean) => void>,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
  },
  'onUpdate:modelValue': {
    type: Function as PropType<(v: boolean) => void>,
  },
} as const;

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;

export const checkboxGroupProps = {
  ...commonProps,
  modelValue: {
    type: Array as PropType<string[]>,
    required: true,
  },
  direction: {
    type: String as PropType<Direction>,
    default: 'column',
  },
  itemWidth: {
    type: Number,
    default: undefined,
  },
  options: {
    type: Array as PropType<({ value: string } & Partial<CheckboxProps>)[]>,
    default: () => [],
  },
  onChange: {
    type: Function as PropType<(v: string[]) => void>,
    default: undefined,
  },
  'onUpdate:modelValue': {
    type: Function as PropType<(v: string[]) => void>,
    default: undefined,
  },
} as const;

interface checkboxGroupInjection {
  disabled: Ref<boolean>;
  isShowTitle: Ref<boolean>;
  color: Ref<string | undefined>;
  showAnimation: Ref<boolean>;
  beforeChange:
  | undefined
  | ((isChecked: boolean, v: string) => boolean | Promise<boolean>);
  toggleGroupVal: (v: string) => void;
  isItemChecked: (v: string) => boolean;
  itemWidth: Ref<number | undefined>;
  direction: Ref<Direction>;
}

export const checkboxGroupInjectionKey: InjectionKey<checkboxGroupInjection> =
  Symbol('d-checkbox-group');

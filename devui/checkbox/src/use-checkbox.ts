import { PropType, InjectionKey, Ref, ExtractPropTypes } from 'vue';

type Direction = 'row' | 'column';

const commonProps = {
  name: {
    type: String,
    default: undefined
  },
  isShowTitle: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: undefined
  },
  showAnimation: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  beforeChange: {
    type: Function as PropType<(isChecked: boolean, v: string) => boolean | Promise<boolean>>,
    default: undefined
  }
} as const;

export const checkboxProps = {
  ...commonProps,
  halfchecked: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: undefined
  },
  title: {
    type: String,
    default: undefined
  },
  'onUpdate:modelValue' : {
    type: Function as PropType<(v: boolean) => void>,
    default: undefined
  },
  onChange: {
    type: Function as PropType<(v: boolean) => void>,
    default: undefined
  }
} as const;

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;

export const checkboxGroupProps = {
  ...commonProps,
  value: {
    type: Array as PropType<string[]>,
    required: true
  },
  direction: {
    type: String as PropType<Direction>,
    default: 'column'
  },
  itemWidth: {
    type: Number,
    default: undefined
  },
  options: {
    type: Array as PropType<({value: string;} & Partial<CheckboxProps>)[]>,
    default: () => []
  },
  onChange: {
    type: Function as PropType<(v: string[]) => void>,
    default: undefined
  },
  'onUpdate:value': {
    type: Function as PropType<(v: string[]) => void>,
    default: undefined
  }
} as const;

interface checkboxGroupInjection {
  disabled: Ref<boolean>
  isShowTitle: Ref<boolean>
  color: Ref<string | undefined>
  showAnimation: Ref<boolean>
  beforeChange: undefined | ((isChecked: boolean, v: string) => boolean | Promise<boolean>)
  toggleGroupVal: (v: string) => void
  isItemChecked: (v: string) => boolean
  itemWidth: Ref<number | undefined>
  direction: Ref<Direction>
}

export const checkboxGroupInjectionKey: InjectionKey<checkboxGroupInjection> = Symbol('d-checkbox-group');

import type { InjectionKey, PropType, Ref, ExtractPropTypes, ComputedRef } from 'vue';
export type valueTypes = string | number | boolean;
export type sizeTypes = 'lg' | 'md' | 'sm';

/** radio、radio-group 共用 props */
const radioCommonProps = {
  /** 双向绑定的值 */
  modelValue: {
    type: [Number, String, Boolean] as PropType<valueTypes>,
    default: null,
  },
  /** 单选框的名称 */
  name: {
    type: String as PropType<string | undefined>,
    default: null,
  },
  /** 值改变之前触发的事件 */
  beforeChange: {
    type: Function as PropType<(value: valueTypes) => boolean | Promise<boolean>>,
    default: null,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<sizeTypes>
  },
};

/** radio 的 props */
export const radioProps = {
  ...radioCommonProps,
  /** 单选框的值 */
  value: {
    type: [Number, String, Boolean] as PropType<valueTypes>,
    required: true,
    default: null,
  },
  border: {
    type: Boolean,
    default: false,
  },
} as const;

/** radio-group 的 props */
export const radioGroupProps = {
  ...radioCommonProps,
  /** 选项列表 */
  values: {
    type: Array as PropType<(string | number)[] | null>,
    default: null,
  },
  /** 展示方式，横向/竖向 */
  direction: {
    type: String as PropType<'row' | 'column'>,
    default: 'column',
  },
  border: {
    type: Boolean,
    default: false,
  },
  fill: {
    type: String,
    default: '',
  },
  textColor: {
    type: String,
    default: '',
  },
} as const;

export type RadioProps = ExtractPropTypes<typeof radioProps>;
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;

/** radio-group 注入字段的接口 */
interface RadioGroupInjection {
  modelValue: Ref<string | number | boolean>;
  name: Ref<string | undefined>;
  disabled: Ref<boolean>;
  beforeChange: (value: valueTypes) => boolean | Promise<boolean>;
  emitChange: (value: valueTypes) => void;
  border: Ref<boolean>;
  size: Ref<string>;
  fill: Ref<string | undefined>;
  textColor: Ref<string | undefined>;
}

/** radio-group 注入 radio 的 key 值 */
export const radioGroupInjectionKey: InjectionKey<RadioGroupInjection> = Symbol('DRadioGroup');

export type UseRadioFn = {
  isChecked: ComputedRef<boolean>;
  radioName: ComputedRef<string | undefined>;
  isDisabled: ComputedRef<boolean | undefined>;
  handleChange: (event: Event) => Promise<void>;
  border: ComputedRef<boolean>;
  size: ComputedRef<string>;
};

export type UseRadioButtonFn = {
  mergedColor: ComputedRef<string | undefined>;
  mergedTextColor: ComputedRef<string | undefined>;
};

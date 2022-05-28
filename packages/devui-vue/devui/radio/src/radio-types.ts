import type { InjectionKey, PropType, Ref, ExtractPropTypes, ComputedRef } from 'vue';
export type valueTypes = string | number | boolean;

/** radio、radio-group 共用 props */
const radioCommonProps = {
  /** 双向绑定的值 */
  modelValue: {
    type: [Number, String, Boolean] as PropType<valueTypes>,
    default: null,
  },
  /** 单选框的名称 */
  name: {
    type: String as PropType<string | null>,
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
} as const;

export type RadioProps = ExtractPropTypes<typeof radioProps>;
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;

/** radio-group 注入字段的接口 */
interface RadioGroupInjection {
  modelValue: Ref<string>;
  name: Ref<string>;
  disabled: Ref<boolean>;
  beforeChange: (value: valueTypes) => boolean | Promise<boolean>;
  emitChange: (value: valueTypes) => void;
}

/** radio-group 注入 radio 的 key 值 */
export const radioGroupInjectionKey: InjectionKey<RadioGroupInjection> = Symbol('DRadioGroup');

export type UseRadioFn = {
  isChecked: ComputedRef<boolean>;
  radioName: ComputedRef<string | undefined>;
  isDisabled: ComputedRef<boolean | undefined>;
  handleChange: (event: Event) => Promise<void>;
};

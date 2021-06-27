import type { InjectionKey, PropType, Ref } from 'vue';

const radioCommonProps = {
  name: {
    type: String as PropType<string | undefined>,
    default: undefined
  },
  value: {
    type: String,
    required: true
  },
  beforeChange: {
    type: Function as PropType<(value: string) => boolean | Promise<boolean>>,
    default: undefined
  },
  onChange: {
    type: Function as PropType<(v: string) => void>,
    default: undefined
  }
} as const;

export const radioProps = {
  ...radioCommonProps,
  'onUpdate:checked': Function as PropType<(v: boolean) => void>,
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const;

export const radioGroupProps = {
  ...radioCommonProps,
  name: {
    type: String as PropType<string | undefined>,
    default: undefined
  },
  'onUpdate:value': Function as PropType<(value: string) => void>,
  cssStyle: {
    type: String as PropType<'row' | 'column'>,
    default: 'column'
  }
} as const;

interface RadioGroupInjection {
  value: Ref<string>
  name: Ref<string>
  beforeChange: (value: string) => boolean | Promise<boolean>
  doChange: (value: string) => void
}

export const radioGroupInjectionKey: InjectionKey<RadioGroupInjection> = Symbol('DRadioGroup');

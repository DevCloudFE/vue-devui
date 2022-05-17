import { PropType, ComputedRef, ExtractPropTypes, Ref } from 'vue';

export interface OptionObjectItem {
  name: string;
  value: string | number;
  _checked: boolean;
  [key: string]: unknown;
}

export type OptionItem = number | string | ({ value: string | number } & Partial<OptionObjectItem>);
export type Options = Array<OptionItem>;

export type ModelValue = number | string | Array<number | string>;

export const selectProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<ModelValue>,
    default: '',
  },
  'onUpdate:modelValue': {
    type: Function as PropType<(val: ModelValue) => void>,
    default: undefined,
  },
  options: {
    type: Array as PropType<Options>,
    default: () => [],
  },
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md',
  },
  overview: {
    type: String as PropType<'border' | 'underlined'>,
    default: 'border',
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  optionDisabledKey: {
    type: String,
    default: '',
  },
  onToggleChange: {
    type: Function as PropType<(bool: boolean) => void>,
    default: undefined,
  },
  onValueChange: {
    type: Function as PropType<(item: OptionItem, index: number) => void>,
    default: undefined,
  },
} as const;

export type SelectProps = ExtractPropTypes<typeof selectProps>;

export interface UseSelectReturnType {
  containerRef: Ref<HTMLElement | undefined>;
  dropdownRef: Ref<HTMLElement | undefined>;
  isOpen: Ref<boolean>;
  selectCls: ComputedRef<string>;
  mergeOptions: ComputedRef;
  inputValue: ComputedRef<string>;
  selectionCls: ComputedRef<string>;
  inputCls: ComputedRef<string>;
  onClick: (e: MouseEvent) => void;
  handleClear: (e: MouseEvent) => void;
  valueChange: (item: OptionObjectItem, index: number) => void;
  getItemClassName: (item: OptionObjectItem) => string;
}

export const optionProps = {
  modelValue: {
    type: [String, Number, Boolean, Object] as PropType<ModelValue>,
    default: '',
  },
  label: [String, Number],
  disabled: {
    type: Boolean,
    default: false,
  },
};

export type OptionProps = ExtractPropTypes<typeof optionProps>;

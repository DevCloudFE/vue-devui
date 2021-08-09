import { PropType, ExtractPropTypes } from 'vue';

export interface OptionObjectItem {
  name: string
  value: string | number
  [key: string]: any
}
export type OptionItem = number | string | OptionObjectItem;
export type Options = Array<OptionItem>;

export const selectProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  'onUpdate:modelValue': {
    type: Function as PropType<(val: string | number) => void>,
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

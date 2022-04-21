import type { PropType, ExtractPropTypes } from 'vue';

export interface OptionObjectItem {
  label: string;
  value: string | number;
  [key: string]: unknown;
}
export type OptionType = string | number | OptionObjectItem;

export type OptionsType = Array<OptionType>;

export const editableSelectProps = {
  options: {
    type: Array as PropType<OptionsType>,
    default: () => [],
  },
  disabled: {
    type: Boolean,
  },
  loading: {
    type: Boolean,
  },
  optionDisabledKey: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Search',
  },
  modelValue: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
  },
  maxHeight: {
    type: Number,
  },
  filterOption: {
    type: [Function, Boolean] as PropType<boolean | ((input: string, option: OptionObjectItem) => boolean)>,
  },
} as const;

export type EditableSelectProps = ExtractPropTypes<typeof editableSelectProps>;

import type { PropType, ExtractPropTypes } from 'vue';
import { OptionObjectItem, OptionsType } from './editable-select-type';
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

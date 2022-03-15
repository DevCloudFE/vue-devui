import type { PropType, ExtractPropTypes } from 'vue';
import { OptionObjectItem, OptionsType } from './editable-select-type';
export const editableSelectProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
  appendToBody: {
    type: Boolean
  },
  options: {
    type: Array as PropType<OptionsType>,
    default: () => []
  },
  disabled: {
    type: Boolean
  },
  loading: {
    type: Boolean
  },
  optionDisabledKey: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search'
  },
  modelValue: {
    type: String
  },
  width: {
    type: Number
  },
  maxHeight: {
    type: Number
  },
  filterOption: {
    type: [Function, Boolean] as PropType<
    boolean | ((input: string, option: OptionObjectItem) => boolean)
    >
  },
  loadMore: {
    type: Function as PropType<(val: string) => void>
  }
} as const;

export type EditableSelectProps = ExtractPropTypes<typeof editableSelectProps>;

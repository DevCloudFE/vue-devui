import type { PropType, ExtractPropTypes } from 'vue';

export interface OptionObjectItem {
  label: string;
  value: string | number;
  [key: string]: unknown;
}
export type Option = string | number | Partial<OptionObjectItem>;

export type Options = Array<Option>;

export const editableSelectProps = {
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array as PropType<Options>,
    default: () => [],
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
  },
  disabledKey: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Search',
  },
  width: {
    type: Number,
  },
  maxHeight: {
    type: Number,
  },
  loading: {
    type: Boolean,
  },
  enableLazyLoad: {
    type: Boolean,
    default: false,
  },
  searchFn: {
    type: Function as PropType<(option: OptionObjectItem, term: string) => boolean>,
  },
} as const;

export type EditableSelectProps = ExtractPropTypes<typeof editableSelectProps>;

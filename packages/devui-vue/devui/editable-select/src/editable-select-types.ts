import type { PropType, ExtractPropTypes, InjectionKey, Ref, ComputedRef } from 'vue';

export interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: unknown;
}

export type Options = Array<Option>;
export type Placement =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';

export type EditableSelectSize = 'sm' | 'lg';

export const editableSelectProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Array as PropType<Placement[]>,
    default: ['bottom'],
  },
  options: {
    type: Array as PropType<Options>,
    default: () => [],
  },
  width: {
    type: Number,
  },
  maxHeight: {
    type: Number,
  },
  size: {
    type: String as PropType<EditableSelectSize>,
  },
  placeholder: {
    type: String,
    default: 'Select',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  disabledKey: {
    type: String,
    default: '',
  },
  remote: {
    type: Boolean,
    default: false,
  },
  filterMethod: {
    type: Function as PropType<(inputValue: string) => void>,
  },
  remoteMethod: {
    type: Function as PropType<(inputValue: string) => void>,
  },
  enableLazyLoad: {
    type: Boolean,
    default: false,
  },
  showGlowStyle: {
    type: Boolean,
    default: true,
  },
  maxLength: {
    type: Number,
  },
} as const;

export type EditableSelectProps = ExtractPropTypes<typeof editableSelectProps>;

export interface EditableSelectContext {
  dropdownRef: Ref<HTMLElement | undefined>;
  query: Ref<string>;
  inputValue: Ref<string>;
  hoveringIndex: Ref<number>;
  loading: Ref<boolean>;
  modelValue: Ref<string | number | undefined> | undefined;
  emptyText: ComputedRef<string>;
  disabledKey: string;
  loadMore: () => void;
  handleOptionSelect: (option: Option, byClick: boolean) => void;
  setSoftFocus: () => void;
}

export const SELECT_KEY = Symbol('EditableSelect') as InjectionKey<EditableSelectContext>;

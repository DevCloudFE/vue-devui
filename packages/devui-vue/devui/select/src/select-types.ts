import { PropType, ComputedRef, ExtractPropTypes, Ref } from 'vue';
import { KeyType } from './utils';
export interface OptionObjectItem {
  name: string;
  value: string | number;
  _checked: boolean;
  [key: string]: unknown;
}

export type OptionItem = number | string | ({ value: string | number } & Partial<OptionObjectItem>);
export type Options = Array<OptionItem>;

export type ModelValue = number | string | Array<number | string>;
export type filterValue = boolean | ((query: string) => void);
export type SelectSize = 'sm' | 'md' | 'lg';
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
    type: String as PropType<SelectSize>,
    default: 'md',
  },
  // TODO: 这个api命名不合理
  overview: {
    type: String as PropType<'border' | 'underlined'>,
    default: 'border',
  },
  placeholder: {
    type: String,
    default: '',
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
  collapseTags: {
    type: Boolean,
    default: false,
  },
  collapseTagsTooltip: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: [Boolean, Function] as PropType<filterValue>,
    default: false,
  },
  remote: {
    type: Boolean,
    default: false,
  },
  allowCreate: {
    type: Boolean,
    default: false,
  },
  noDataText: {
    type: String,
    default: '',
  },
  noMatchText: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
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
  multipleLimit: {
    type: Number,
    default: 0,
  },
} as const;

export type SelectProps = ExtractPropTypes<typeof selectProps>;

export type OptionModelValue = number | string;

export interface UseSelectReturnType {
  selectDisabled: ComputedRef<boolean>;
  selectSize: ComputedRef<SelectSize>;
  originRef: Ref<HTMLElement | undefined>;
  dropdownRef: Ref<HTMLElement | undefined>;
  isOpen: Ref<boolean>;
  selectCls: ComputedRef<string>;
  isObjectOption: Ref<boolean>;
  mergeOptions: Ref<OptionObjectItem[]>;
  injectOptions: Ref<Map<string | number, Record<string, unknown>>>;
  injectOptionsArray: ComputedRef<OptionObjectItem[]>;
  selectedOptions: ComputedRef<OptionObjectItem[]>;
  dropdownWidth: ComputedRef<string>;
  onClick: (e: MouseEvent) => void;
  handleClear: (e: MouseEvent) => void;
  valueChange: (item: OptionObjectItem) => void;
  handleClose: () => void;
  updateInjectOptions: (item: Record<string, unknown>, operation: string, isObject: boolean) => void;
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
  isDisabled: (item: OptionObjectItem) => boolean;
  toggleChange: (bool: boolean) => void;
  getValuesOption: (values: KeyType<OptionObjectItem, 'value'>[]) => unknown[];
  getInjectOptions: (values: KeyType<OptionObjectItem, 'value'>[]) => unknown[];
}

export interface SelectContext extends SelectProps {
  selectDisabled: boolean;
  selectSize: string;
  isOpen: boolean;
  selectedOptions: OptionObjectItem[];
  filterQuery: string;
  valueChange: (item: OptionObjectItem) => void;
  multipleValueChange: (item: OptionObjectItem) => void;
  handleClear: () => void;
  updateInjectOptions: (item: Record<string, unknown>, operation: string, isObject: boolean) => void;
  tagDelete: (data: OptionObjectItem) => void;
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
  debounceQueryFilter: (query: string) => void;
}

export const optionProps = {
  value: {
    type: [String, Number] as PropType<OptionModelValue>,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  create: {
    type: Boolean,
    default: false,
  },
};

export type OptionProps = ExtractPropTypes<typeof optionProps>;

export interface UseOptionReturnType {
  currentName: ComputedRef<OptionModelValue>;
  selectOptionCls: ComputedRef<string>;
  isVisible: ComputedRef<boolean>;
  optionSelect: () => void;
}

export interface UseSelectContentReturnType {
  searchQuery: Ref<string>;
  selectedData: ComputedRef<OptionObjectItem[]>;
  isSelectDisable: ComputedRef<boolean>;
  isSupportCollapseTags: ComputedRef<boolean>;
  isDisabledTooltip: ComputedRef<boolean>;
  isReadOnly: ComputedRef<boolean>;
  selectionCls: ComputedRef<string>;
  inputCls: ComputedRef<string>;
  tagSize: ComputedRef<string>;
  placeholder: ComputedRef<string>;
  isMultiple: ComputedRef<boolean>;
  displayInputValue: ComputedRef<string>;
  handleClear: (e: MouseEvent) => void;
  tagDelete: (data: OptionObjectItem) => void;
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
  queryFilter: (e: Event) => void;
}

export interface UseSelectFunctionReturn {
  isSelectFocus: Ref<boolean>;
  blur: () => void;
  focus: () => void;
}

export const optionGroupProps = {
  label: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
};

export type OptionGroupProps = ExtractPropTypes<typeof optionGroupProps>;

export type OptionGroupContext = OptionGroupProps;

export interface allowCreateOption {
  filterQuery: Ref<string>;
  injectOptionsArray: ComputedRef<OptionObjectItem[]>;
}

export interface useAllowCreateReturn {
  isShowCreateOption: ComputedRef<boolean>;
}

export interface useFilterReturn {
  filterQuery: Ref<string>;
  isSupportFilter: ComputedRef<boolean>;
  debounceQueryFilter: (query: string) => void;
}

export interface useMultipleOption {
  filterQuery: Ref<string>;
  isSupportFilter: ComputedRef<boolean>;
  isObjectOption: Ref<boolean>;
  mergeOptions: Ref<OptionObjectItem[]>;
  injectOptions: Ref<Map<string | number, Record<string, unknown>>>;
  getValuesOption: (values: KeyType<OptionObjectItem, 'value'>[]) => unknown[];
  getInjectOptions: (values: KeyType<OptionObjectItem, 'value'>[]) => unknown[];
}

export interface useMultipleReturn {
  multipleValueChange: (item: OptionObjectItem) => void;
  tagDelete: (data: OptionObjectItem) => void;
}

export interface useNoDataOption {
  filterQuery: Ref<string>;
  isSupportFilter: ComputedRef<boolean>;
  injectOptionsArray: ComputedRef<OptionObjectItem[]>;
  t: (path: string) => unknown;
}

export interface useNoDataReturn {
  isLoading: Ref<boolean>;
  emptyText: ComputedRef<string>;
  isShowEmptyText: ComputedRef<boolean>;
}

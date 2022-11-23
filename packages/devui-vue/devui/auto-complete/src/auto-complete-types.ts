import type { PropType, ExtractPropTypes, InjectionKey, SetupContext, Ref, ComputedRef } from 'vue';
export interface SourceItemObj {
  label: string;
  disabled: boolean;
  [propName: string]: unknown;
}
const defaultFormatter = (item: string | SourceItemObj) => {
  if (typeof item === 'string') {
    return item;
  }
  return item !== null ? item.label || item.toString() : '';
};
const defaultValueParse = (item: string | SourceItemObj) => item;
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

export type AutoCompleteSize = 'sm' | 'md' | 'lg';

export type SourceType = Array<string> | Array<SourceItemObj>;

export const autoCompleteProps = {
  modelValue: {
    type: String,
    default: '',
  },
  source: {
    type: Array as PropType<SourceType>,
    default: null,
  },
  allowEmptyValueSearch: {
    type: Boolean,
    default: false,
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Array as PropType<Array<Placement>>,
    default: ['bottom-end'],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: Number,
    default: 300,
  },
  disabledKey: {
    type: String,
    default: null,
  },
  formatter: {
    type: Function as PropType<(item: string | SourceItemObj) => string>,
    default: defaultFormatter,
  },
  isSearching: {
    type: Boolean,
    default: false,
  },
  sceneType: {
    type: String,
    default: null,
  },
  searchFn: {
    type: Function as PropType<(term: string) => SourceType>,
    default: null,
  },
  tipsText: {
    type: String,
    default: '最近输入',
  },
  latestSource: {
    type: Array,
    default: null,
  },
  valueParser: {
    type: Function as PropType<(item: string | SourceItemObj) => string>,
    default: defaultValueParse,
  },
  enableLazyLoad: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 400,
  },
  showAnimation: {
    type: Boolean,
    default: true,
  },
  maxHeight: {
    type: Number,
    default: 300,
  },
  transInputFocusEmit: {
    type: Function as PropType<() => void>,
    default: null,
  },
  selectValue: {
    type: Function as PropType<(val: string) => string>,
    default: null,
  },
  loadMore: {
    type: Function as PropType<() => void>,
    default: null,
  },
  placeholder: {
    type: String,
    default: 'Search',
  },
  prefix: {
    type: String,
    default: '',
  },
  suffix: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<AutoCompleteSize>,
    default: 'md',
  },
  clearable: {
    type: Boolean,
    default: false,
  },
} as const;

export type AutoCompleteProps = ExtractPropTypes<typeof autoCompleteProps>;

export interface AutoCompleteRootType {
  ctx: SetupContext;
  props: AutoCompleteProps;
}

export interface UseAutoCompleteRender {
  autoCompleteTopClasses: ComputedRef<Record<string, boolean | undefined>>;
  inputClasses: ComputedRef<Record<string, boolean | undefined>>;
  inputWrapperClasses: ComputedRef<Record<string, boolean | undefined>>;
  inputInnerClasses: ComputedRef<Record<string, boolean | undefined>>;
}

export interface UseInputHandle {
  handleClose: () => void;
  toggleMenu: () => void;
  onInput: (e: Event) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClear: () => void;
  inputRef: Ref;
  isFocus: Ref<boolean>;
  visible: Ref<boolean>;
  searchStatus: Ref<boolean>;
}

export type SearchFnType = (term: string) => SourceType;
export type FormatterType = (item: string | SourceItemObj) => string;
export type DefaultFuncType = () => void;
export type HandleSearch = (term: string, enableLazyLoad?: boolean) => void;
export type RecentlyFocus = (latestSource: Array<SourceItemObj>) => void;
export type InputDebounceCb = (value: string) => void;
export type TransInputFocusEmit = () => unknown;
export type SelectOptionClick = (item: string | SourceItemObj) => void;
export type SelectValueType = (value: string) => unknown;
// 弹出选择框参数
export type DropdownProps = {
  props: AutoCompleteProps;
  searchList: Ref<SourceType>;
  searchStatus?: Ref<boolean>;
  showNoResultItemTemplate: Ref<boolean>;
  term?: string;
  visible: Ref<boolean>;
  selectedIndex: Ref<number>;
  selectOptionClick: SelectOptionClick;
  dropDownRef: Ref;
  showLoading: Ref<boolean>;
  loadMore: () => void;
  latestSource: Ref;
  modelValue: Ref<string>;
  hoverIndex: Ref<number>;
  valueParser: Ref;
  isDisabled: ComputedRef<boolean>;
};
export const DropdownPropsKey: InjectionKey<DropdownProps> = Symbol('DropdownPropsKey');

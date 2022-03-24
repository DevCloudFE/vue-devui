import type { PropType, ExtractPropTypes, InjectionKey, SetupContext, Ref } from 'vue';
const defaultFormatter = (item: any) => (item ? item.label || item.toString() : '');
const defaultValueParse = (item: any) => item;
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
export const autoCompleteProps = {
  modelValue: {
    type: String,
    default:''
  },
  source:{
    type :Array,
    default:null
  },
  allowEmptyValueSearch:{
    type:Boolean,
    default:false
  },
  position :{
    type: Array as PropType<Array<Placement>>,
    default: ['bottom-end'],
  },
  disabled:{
    type:Boolean,
    default:false
  },
  delay:{
    type:Number,
    default:300
  },
  disabledKey:{
    type:String,
    default:null
  },
  formatter: {
    type:Function as PropType<(item: any) => string>,
    default:defaultFormatter
  },
  isSearching: {
    type:Boolean,
    default:false
  },
  sceneType:{
    type:String,
    default:null
  },
  searchFn:{
    type:Function as PropType<(term: string) => Array<any>>,
    default:null
  },
  tipsText:{
    type:String,
    default:'最近输入'
  },
  latestSource:{
    type:Array,
    default:null
  },
  valueParser:{
    type:Function as PropType<(item: any) => any>,
    default:defaultValueParse
  },
  enableLazyLoad: {
    type:Boolean,
    default:false
  },
  width:{
    type: Number,
    default:400
  },
  showAnimation:{
    type:Boolean,
    default:true
  },
  maxHeight:{
    type:Number,
    default:300
  },
  transInputFocusEmit:{
    type:Function as PropType<() => void>,
    default:null
  },
  selectValue:{
    type:Function as PropType<(val: any) => any>,
    default:null
  },
  loadMore:{
    type:Function as PropType<() => void>,
    default:null
  }
} as const;

export type AutoCompleteProps = ExtractPropTypes<typeof autoCompleteProps>;

export interface AutoCompleteRootType {
  ctx: SetupContext<any>;
  props: AutoCompleteProps;
}
export type SearchFnType = (term: string) => Array<any>;
export type FormatterType = (item: any) => string;
export type DefaultFuncType = (arg?: any) => any;
export type HandleSearch = (term?: string | string,enableLazyLoad?: boolean) => void;
export type RecentlyFocus = (latestSource: Array<any>) => void;
export type InputDebounceCb = (...rest: any) => Promise<void>;
export type TransInputFocusEmit = (any?: any) => void;
export type SelectOptionClick = (any?: any) => void;
// 弹出选择框参数
export type DropdownProps = {
  props: AutoCompleteProps;
  searchList: Ref<any[]>;
  searchStatus?: Ref<boolean>;
  showNoResultItemTemplate: Ref<boolean>;
  term?: string;
  visible: Ref<boolean>;
  selectedIndex: Ref<number>;
  selectOptionClick: HandleSearch;
  dropDownRef: Ref<HTMLUListElement>;
  showLoading: Ref<boolean>;
  loadMore: (arg?: any) => void;
  latestSource: Ref<any[]>;
  modelValue: Ref<string>;
  hoverIndex: Ref<number>;
};
export const DropdownPropsKey: InjectionKey<DropdownProps>=Symbol('DropdownPropsKey');

import type { PropType, ExtractPropTypes, InjectionKey, SetupContext, Ref } from 'vue'
const defaultFormatter = (item) => (item ? item.label || item.toString() : '');
const defaultValueParse = (item) => item;
// appendToBody使用
export type HorizontalConnectionPos = 'left' | 'center' | 'right';
export type VerticalConnectionPos = 'top' | 'center' | 'bottom';
export interface ConnectionPosition {
  originX: HorizontalConnectionPos
  originY: VerticalConnectionPos
  overlayX: HorizontalConnectionPos
  overlayY: VerticalConnectionPos
}
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
  appendToBody :{
    type:Boolean,
    default:false
  },
  appendToBodyDirections :{
    type: Object as PropType<ConnectionPosition>,
    default: (): ConnectionPosition => ({
      originX: 'left',
      originY: 'bottom',
      overlayX: 'left',
      overlayY: 'top',
    }),
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
  dAutoCompleteWidth:{
    type: Number,
    default:null
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
    type:Function as PropType<(any) => void>,
    default:null
  },
  selectValue:{
    type:Function as PropType<(any) => void>,
    default:null
  },
  loadMore:{
    type:Function as PropType<() => void>,
    default:null
  }
} as const

export type AutoCompleteProps = ExtractPropTypes<typeof autoCompleteProps>

export interface AutoCompleteRootType {
  ctx:SetupContext<any>
  props:AutoCompleteProps
}
export type SearchFnType = (term: string) => Array<any>
export type FormatterType = (item: any) => string
export type DefaultFuncType = (any?) => any
export type HandleSearch = (term?:string | string,enableLazyLoad?:boolean) => void 
export type RecentlyFocus = (latestSource:Array<any>) => void
export type InputDebounceCb = (...rest:any) => Promise<void>
export type TransInputFocusEmit = (any?: any) => void
export type SelectOptionClick = (any?: any) => void
//弹出选择框参数
export type DropdownProps = {
  props:AutoCompleteProps
  searchList:Ref<any[]>
  searchStatus?:Ref<boolean>
  showNoResultItemTemplate:Ref<boolean>
  term?: string
  visible: Ref<boolean>
  selectedIndex:Ref<number>
  selectOptionClick:HandleSearch
  dropDownRef
  showLoading:Ref<boolean>
  loadMore
  latestSource
  modelValue:Ref<string>
  hoverIndex:Ref<number>
}
export const DropdownPropsKey:InjectionKey<DropdownProps>=Symbol('DropdownPropsKey')

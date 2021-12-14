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
    default:""
  },
  source:{
    type :Array
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
    type:String
  },
  formatter: {
    type:Function as PropType<(item: any) => String>,
    default:defaultFormatter
  },
  isSearching: {
    type:Boolean,
    default:false
  },
  sceneType:{
    type:String
    // sceneType使用场景：select(下拉框) suggest(联想)
  },
  searchFn:{
    type:Function as PropType<(term: string) => Array<any>>
  },
  tipsText:{
    type:String,
    default:'最近输入'
  },
  latestSource:{
    type:Array
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
    type: Number
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
    type:Function
  },
  selectValue:{
    type:Function
  },
} as const

export type AutoCompleteProps = ExtractPropTypes<typeof autoCompleteProps>

export interface AutoCompleteRootType {
  ctx:SetupContext<any>,
  props:AutoCompleteProps,
}
//弹出选择框参数
export type DropdownProps = {
  props:AutoCompleteProps,
  searchList:Ref<any[]>,
  searchStatus?:Ref<boolean>,
  showNoResultItemTemplate:Ref<boolean>,
  term?: String,
  visible: Ref<Boolean>,
  selectedIndex:Ref<Number>,
  selectOptionClick:Function
}
export const DropdownPropsKey:InjectionKey<DropdownProps>=Symbol("DropdownPropsKey")

import type { PropType, ExtractPropTypes, Ref } from 'vue'
import { UnwrapNestedRefs } from '@vue/reactivity'

type TriggerTypes = 'hover'|'click'

export interface CascaderItem {
  label: string
  value: number | string
  isLeaf?: boolean
  children?: CascaderItem[]
  disabled?: boolean
  icon?: string
  // 用户可以传入自定义属性，并在dropDownItemTemplate中使用
  [prop: string]: any
}

export const cascaderProps = {
  /**
   * 可选，指定展开次级菜单方式
   * @description 可选择的值 'hover', 'click'
   * @type {('hover'|'click')}
   * @default 'hover'
   */
  trigger: {
    type: String as PropType<TriggerTypes>,
    default: 'hover'
  },
  /**
   * 必选，级联器的菜单信息
   * @type {CascaderItem[]}
   * @default []
   */
  options: {
    type: Array as PropType<CascaderItem[]>,
    default: [],
    required: true
  },
  /**
   * 可选，级联器是否禁用
   * @type {boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 可选，没有选择时的输入框展示信息
   * @type {string}
   * @default '''
   */
  placeholder: {
    type: String,
    default: ''
  }

} as const

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>

export interface PopupTypes {
  menuShow: Ref<boolean>
  menuOpenClass: Ref<string>
  openPopup:  (e?: MouseEvent) => void
}

export interface OptionsCallback {
  cascaderOptions: never | UnwrapNestedRefs<[CascaderItem[]]>
  changeCascaderIndexs: (optionItem: CascaderItem, ulIndex: number) => void
}

type cascaderItemExtendsProps = 'trigger'
export type PickCascader = Pick<CascaderProps, cascaderItemExtendsProps>
export interface UseCascaderItemCallback {
  cascaderItemNeedProps: PickCascader
}

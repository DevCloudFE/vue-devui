import type { PropType, ExtractPropTypes, Ref } from 'vue'
import { CascaderItem, CascaderItemNeedType } from '../../src/cascader-types'
export const cascaderulProps = {
  /**
   * 每个ul中的li
   * @type {CascaderItem[]}
   * @default []
   */
  cascaderItems: {
    type: Array as PropType<CascaderItem[]>,
    default: [],
  },
  /**
   * 当前选中的ul下标
   * @type {Number}
   * @default 0
   */
  ulIndex: {
    type: Number,
    default: 0
  },
  cascaderItemNeedProps: {
    type: Object as PropType<CascaderItemNeedType>,
    default: {}
  },
  stopDefault: {
    type: Boolean,
    default: false
  },
  cascaderOptions: {
    type: Array as unknown as PropType<[CascaderItem[]]>,
    default: []
  }
}
export type CascaderulProps = ExtractPropTypes<typeof cascaderulProps>

export interface CascaderItemPropsType extends CascaderulProps {
  cascaderItem: CascaderItem
  liIndex: number
  cascaderItemNeedProps: CascaderItemNeedType
}
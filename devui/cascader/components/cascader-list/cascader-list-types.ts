import type { PropType, ExtractPropTypes } from 'vue'
import { CascaderItem, PickCascader } from '../../src/cascader-types'
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
    type: Object as PropType<PickCascader>,
    default: {}
  }
}
export type CascaderulProps = ExtractPropTypes<typeof cascaderulProps>

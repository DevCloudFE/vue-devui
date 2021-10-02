import type { PropType, ExtractPropTypes } from 'vue'
import { CascaderItem } from '../../src/cascader-types'
export const cascaderulProps = {
  /**
   * 每个ul中的li
   * @type {CascaderItem[]}
   * @default []
   */
  cascaderlis: {
    type: Object as PropType<CascaderItem[]>,
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
  }
}
export type CascaderulProps = ExtractPropTypes<typeof cascaderulProps>

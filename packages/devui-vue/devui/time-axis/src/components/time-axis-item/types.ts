import type { PropType, ExtractPropTypes } from 'vue'
import type { LineStyle } from '../../time-axis-types'
export type Position = 'top' | 'bottom' | 'left' | 'right'
export const timeAxisItemProps = {
  time: {
    type: String,
  },
  //可选，自定义时间圈颜色
  dotColor: {
    type: String
  },
  //分界线的样式
  lineStyle: {
    type: String as PropType<LineStyle>,
    default: 'solid'
  },
  //分界线的样式
  lineColor: {
    type: String
  },
  //分界线的样式
  position: {
    type: String as PropType<Position>
  },
} as const

export type TimeAxisItemProps = ExtractPropTypes<typeof timeAxisItemProps>

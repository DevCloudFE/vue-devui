import type { PropType, ExtractPropTypes } from 'vue'
export type DataDirection = 'vertical' | 'horizontal'
export type Mode = 'normal' | 'alternative'
export type LineStyle = 'solid' | 'dashed' | 'dotted' | 'none'


export interface DataItem {
  //时间
  time: string
  //文本内容
  text: string
  //可选，自定义时间圈颜色
  dotColor?: string
  //分界线的样式
  lineStyle?: LineStyle
  //分界线的样式
  lineColor?: string
  //自定义点
  customDot?: string | HTMLElement

  
  //时间点类型
  type?: 'primary' | 'success' | 'danger' | 'warning'
  status?: 'runned' | 'running' | ''
  position?: 'top' | 'bottom' | 'left' | 'right'
  extraElement?: string | HTMLElement
  iconClass?: string
  data?: any
}



export const timeAxisProps = {
  //设置时间轴方向
  direction: {
    type: String as PropType<DataDirection>,
    default: 'vertical'
  },
  //设置居中
  center: {
    type: Boolean,
    default: (): boolean => false
  },
  //设置排序方向
  mode: {
    type: String as PropType<Mode>,
    default: 'normal'
  }
} as const

export type TimeAxisProps = ExtractPropTypes<typeof timeAxisProps>

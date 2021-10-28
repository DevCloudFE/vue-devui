import type { PropType, ExtractPropTypes } from 'vue'
export type DataDirection = 'vertical' | 'horizontal'
export type LineStyle = {
    style: 'solid'|'dashed'|'dotted'|'none'
    color:string
}


export interface DataItem {
  //时间
  time: string
  //文本内容
  text: string
  //可选，自定义时间圈颜色
  dotColor?: string
  //分界线的样式
  lineStyle?: LineStyle




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
  //列表数据
  data: {
    type: Array as PropType<DataItem[]>,
    default:()=>[]
  }
} as const

export type TimeAxisProps = ExtractPropTypes<typeof timeAxisProps>

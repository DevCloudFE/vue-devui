import type { PropType, ExtractPropTypes } from 'vue'



export const timeAxisItemProps = {
  time: {
    type: String,
  },
  text: {
    type: String,
  },

  //可选，自定义时间圈颜色
  dotColor: {
    type: String
  }
} as const

export type TimeAxisItemProps = ExtractPropTypes<typeof timeAxisItemProps>

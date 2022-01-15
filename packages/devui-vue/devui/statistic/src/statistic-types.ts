import type { PropType, ExtractPropTypes, CSSProperties } from 'vue'
import type { easingType } from './utils/animation'
export const statisticProps = {
  title: {
    type: String,
    default: ''
  },
  value: {
    type: [Number, String]
  },
  prefix: {
    type: String
  },
  suffix: {
    type: String
  },
  precision: {
    type: Number
  },
  groupSeparator: {
    type: String,
    default: ''
  },
  showGroupSeparator: {
    type: Boolean,
    default: true
  },
  titleStyle: {
    type: Object as PropType<CSSProperties>
  },
  contentStyle: {
    type: Object as PropType<CSSProperties>
  },
  animationDuration: {
    type: Number,
    default: 2000
  },
  valueFrom: {
    type: Number
  },
  animation: {
    type: Boolean,
    default: false
  },
  start: {
    type: Boolean,
    default: false
  },
  extra: {
    type: String,
    default: ''
  },
  easing: {
    type: String as PropType<easingType>,
    default: 'easeOutCubic'
  },
  delay: {
    type: Number,
    default: 0
  }
} as const

export type StatisticProps = ExtractPropTypes<typeof statisticProps>

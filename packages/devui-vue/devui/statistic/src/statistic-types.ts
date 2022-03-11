import type { PropType, ExtractPropTypes, CSSProperties } from 'vue'
// import type { easingType } from './utils/animation'
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
  valueStyle: {
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
    default: true
  },
  extra: {
    type: String,
    default: ''
  }
} as const

export type StatisticProps = ExtractPropTypes<typeof statisticProps>

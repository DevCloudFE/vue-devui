import type { ExtractPropTypes } from 'vue';

export const statisticProps = {
  title: {
    type: String,
    default: '',
  },
  value: {
    type: [Number, String],
  },
  prefix: {
    type: String,
  },
  suffix: {
    type: String,
  },
  precision: {
    type: Number,
  },
  groupSeparator: {
    type: String,
    default: '',
  },
  animationDuration: {
    type: Number,
    default: 2000,
  },
  valueFrom: {
    type: Number,
  },
  animation: {
    type: Boolean,
    default: false,
  },
  start: {
    type: Boolean,
    default: true,
  },
  extra: {
    type: String,
    default: '',
  },
} as const;

export type StatisticProps = ExtractPropTypes<typeof statisticProps>;

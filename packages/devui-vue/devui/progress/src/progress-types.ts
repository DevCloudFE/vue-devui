import { ExtractPropTypes, Ref } from 'vue';

interface ISvgPath {
  stroke: Ref<string> | string;
  strokeDasharray: string;
  strokeDashoffset: string;
  transition: string;
}

export interface ISvgData {
  pathString: string;
  trailPath: ISvgPath | null;
  strokePath: ISvgPath | null;
}

export const progressProps = {
  height: {
    type: String,
    default: '20px',
  },
  percentage: {
    type: Number,
    default: 0,
  },
  percentageText: {
    type: String,
    default: '',
  },
  barBgColor: {
    type: String,
    default: '#5170ff',
  },
  isCircle: {
    type: Boolean,
    default: false,
  },
  strokeWidth: {
    type: Number,
    default: 6,
  },
  showContent: {
    type: Boolean,
    default: true,
  },
  percentageTextPlacement: {
    type: String,
    default: 'inside',
  },
  percentageTextColor: {
    type: String,
    default: '',
  },
};

export type ProgressProps = ExtractPropTypes<typeof progressProps>;

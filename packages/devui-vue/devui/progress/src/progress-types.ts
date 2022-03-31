import { ExtractPropTypes } from 'vue';

export interface SvgData {
  pathString: string;
  trailPath: any;
  strokePath: any;
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
};

export type ProgressProps = ExtractPropTypes<typeof progressProps>;

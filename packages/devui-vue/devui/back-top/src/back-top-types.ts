import type { PropType, ExtractPropTypes } from 'vue';

export type Position = {
  bottom: string;
  right: string;
};

export const backTopProps = {
  bottom: {
    type: String,
    default: '50px'
  },
  right: {
    type: String,
    default: '30px'
  },
  target: {
    type: String,
    default: 'window'
  },
  visibleHeight: {
    type: Number,
    default: 300
  }
} as const;

export type BackTopProps = ExtractPropTypes<typeof backTopProps>;

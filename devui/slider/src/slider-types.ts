import type { ExtractPropTypes } from 'vue';
export const sliderProps = {
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 50,
  },
  step: {
    type: Number,
    default: 1,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showInput: {
    type: Boolean,
    default: false,
  },
} as const;
export type SliderProps = ExtractPropTypes<typeof sliderProps>;

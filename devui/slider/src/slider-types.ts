import type { ExtractPropTypes } from 'vue';
export const sliderProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  max: {
    type: Number,
    default: 100,
  },
  min: {
    type: Number,
    default: 0,
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  showInput: {
    type: Boolean,
    default: false,
  },
  step: {
    type: Number,
    default: 1,
  },
} as const;
export type SliderProps = ExtractPropTypes<typeof sliderProps>;

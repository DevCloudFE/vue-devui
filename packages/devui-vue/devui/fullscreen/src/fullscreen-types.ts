import type { PropType, ExtractPropTypes } from 'vue';

type ModeType = PropType<'normal' | 'immersive'>;
export const fullscreenProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String as ModeType,
    default: 'normal'
  },
  zIndex: {
    type: Number,
    default: 10
  }
} as const;

export type FullscreenProps = ExtractPropTypes<typeof fullscreenProps>;

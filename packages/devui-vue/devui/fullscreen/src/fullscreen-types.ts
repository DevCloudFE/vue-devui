import type { PropType, ExtractPropTypes } from 'vue'

type ModeType = PropType<'immersive' | 'normal'>
export const fullscreenProps = {
  fullscreenLaunch: {
    type: Function,
    default: undefined
  },
  mode: {
    type: String as ModeType,
    default: 'immersive'
  },
  zIndex: {
    type: Number,
    default: 10
  }
} as const

export type FullscreenProps = ExtractPropTypes<typeof fullscreenProps>

import type { PropType, ExtractPropTypes } from 'vue'

export const readTipProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const

export type ReadTipProps = ExtractPropTypes<typeof readTipProps>

import type { PropType, ExtractPropTypes } from 'vue'

export const stickyProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const

export type StickyProps = ExtractPropTypes<typeof stickyProps>

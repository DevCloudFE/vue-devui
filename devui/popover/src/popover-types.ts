import type { PropType, ExtractPropTypes } from 'vue'

export const popoverProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const

export type PopoverProps = ExtractPropTypes<typeof popoverProps>

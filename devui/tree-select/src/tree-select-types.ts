import type { PropType, ExtractPropTypes } from 'vue'

export const treeSelectProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const

export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>

import type { ExtractPropTypes } from 'vue'

export const editableSelectProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const

export type EditableSelectProps = ExtractPropTypes<typeof editableSelectProps>

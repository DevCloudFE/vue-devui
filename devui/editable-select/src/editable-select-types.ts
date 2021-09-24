import type { ExtractPropTypes } from 'vue'

export const editableSelectProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
  width: {
    type: Number,
    default: 450
  },
  appendToBody: {
    type: Boolean,
    default: true,
  },
  maxHeight: {
    type: Number,
    default: 300
  }

} as const

export type EditableSelectProps = ExtractPropTypes<typeof editableSelectProps>

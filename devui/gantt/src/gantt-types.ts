import type { PropType, ExtractPropTypes } from 'vue'

export const ganttProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const

export type GanttProps = ExtractPropTypes<typeof ganttProps>

import type { PropType, ExtractPropTypes } from 'vue'
import { GanttScaleUnit } from './gantt-model'
export const ganttProps = {
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  unit: {
    type: String as PropType<GanttScaleUnit>,
    default: GanttScaleUnit.day,
  },
} as const

export type GanttProps = ExtractPropTypes<typeof ganttProps>

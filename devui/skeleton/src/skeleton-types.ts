import type { ExtractPropTypes } from 'vue'

export const skeletonProps = {
  row: {
    type: Number || String,
    default: 0
  },
  animate:{
    type: Boolean,
    default: true
  },
  loading:{
    type: Boolean,
    default: true
  }
} as const

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>

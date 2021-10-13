import type { ExtractPropTypes } from 'vue'

export const skeletonProps = {
  row: {
    type: Number,
    required: true
  },
  animate:{
    type: Boolean,
    default: true
  },
  loading:{
    type: Boolean,
    default: true
  },
  avatar:{
    type: Boolean,
    default: false
  }
} as const

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>

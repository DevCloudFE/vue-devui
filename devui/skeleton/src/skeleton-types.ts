import type { ExtractPropTypes } from 'vue'

export const skeletonProps = {
  row: {
    type: Number,
    default: 0
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
  },
  title:{
    type: Boolean,
    default: true
  },
  paragraph:{
    type: Boolean,
    default: true
  },
  avatarSize:{
    type: String,
    default: '40px'
  },
  avatarShape:{
    type: String,
    default: 'round'
  }
} as const

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>

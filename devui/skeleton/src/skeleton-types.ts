import type { ExtractPropTypes,PropType } from 'vue'

export type ModelValue = number | string
export type ArrayModelValue = number | string | Array<number | string>

export const skeletonProps = {
  row: {
    type: Number,
    default: 0
  },
  animate:{
    type: Boolean,
    default: true
  },
  round:{
    type: Boolean,
    default: false
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
    type: [String,Number] as PropType<ModelValue>,
    default: '40px'
  },
  avatarShape:{
    type: String,
    default: 'round'
  },
  titleWidth:{
    type: [String,Number] as PropType<ModelValue>,
    default: '40%'
  },
  rowWidth:{
    type: [String,Number,Array] as PropType<ArrayModelValue>,
    default: '1'
  }
} as const

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>

import type { PropType, ExtractPropTypes } from 'vue'

export type Position = {
  position: 'fixed'
  bottom: string
  right: string
}

export const backTopProps = {
  bottom: {
    type: String,
    default: '50px'
  },
  right: {
    type: String as PropType<string>,
    default: '30px'
  }
} as const

export type BackTopProps = ExtractPropTypes<typeof backTopProps>

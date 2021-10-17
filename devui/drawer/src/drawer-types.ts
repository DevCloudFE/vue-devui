import type { ExtractPropTypes } from 'vue'

export const drawerProps = {
  width: {
    type: String,
    default: '300px',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 1000,
  },
  isCover: {
    type: Boolean,
    default: true,
  },
  escKeyCloseable: {
    type: Boolean,
    default: true,
  },
} as const

export type DrawerProps = ExtractPropTypes<typeof drawerProps>

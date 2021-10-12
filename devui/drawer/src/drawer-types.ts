import type { ExtractPropTypes } from 'vue'

export const drawerProps = {
  width: {
    type: String,
    default: '300px',
  },
} as const

export type DrawerProps = ExtractPropTypes<typeof drawerProps>

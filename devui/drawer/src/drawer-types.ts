import type { ExtractPropTypes } from 'vue'

export const drawerProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
  width: {
    type: String,
    default: '300px',
  },
} as const

export type DrawerProps = ExtractPropTypes<typeof drawerProps>

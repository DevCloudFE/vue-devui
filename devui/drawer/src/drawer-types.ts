import type { PropType, ExtractPropTypes } from 'vue'

export const drawerProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const

export type DrawerProps = ExtractPropTypes<typeof drawerProps>

import type { ExtractPropTypes} from 'vue'

export const drawerHeaderType = {

} as const

export type DrawerHeaderType = ExtractPropTypes<typeof drawerHeaderType>

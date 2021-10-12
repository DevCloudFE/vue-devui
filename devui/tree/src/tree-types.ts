import type { PropType, ExtractPropTypes, SetupContext } from 'vue'

export interface TreeItem {
  id: string
  label: string
  isParent?: boolean
  level: number
  open?: boolean
  children?: TreeData
  [key: string]: any
}

export type TreeData = Array<TreeItem>

export const treeProps = {
  data: {
    type: Array as PropType<TreeData>,
    required: true,
    default: () => [],
  }
} as const

export type TreeProps = ExtractPropTypes<typeof treeProps>

export interface TreeRootType {
  ctx: SetupContext<any>
  props: TreeProps
}
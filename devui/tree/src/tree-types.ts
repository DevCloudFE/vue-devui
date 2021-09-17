import type { PropType, ExtractPropTypes } from 'vue'

export interface TreeItem {
  label: string
  children: TreeData
  [key: string]: any
}

export type TreeData = Array<TreeItem>;

export const treeProps = {
  data: {
    type: Array as PropType<TreeData>,
    default: () => [],
  }
} as const

export type TreeProps = ExtractPropTypes<typeof treeProps>

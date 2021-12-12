import type { PropType, ExtractPropTypes, SetupContext } from 'vue'

export interface TreeItem {
  id: string
  label: string
  isParent?: boolean
  level?: number
  open?: boolean
  addable?: boolean
  editable?: boolean
  deletable?: boolean
  children?: TreeData
  [key: string]: any
}
export interface SelectType {
  [key: string]: 'none' | 'half' | 'select'
}

export interface ReverseTree {
  id?: string
  children?: string[]
  parent?: ReverseTree 
}

export type TreeData = Array<TreeItem>

export type CheckableRelationType = 'downward' | 'upward' | 'both' | 'none'

export const treeProps = {
  data: {
    type: Array as PropType<TreeData>,
    required: true,
    default: () => [],
  },
  checkable: {
    type: Boolean,
    default: false
  },
  checkableRelation: {
    type: String as () => CheckableRelationType,
    default: 'none',
  }
} as const

export type TreeProps = ExtractPropTypes<typeof treeProps>

export interface TreeRootType {
  ctx: SetupContext<any>
  props: TreeProps
}

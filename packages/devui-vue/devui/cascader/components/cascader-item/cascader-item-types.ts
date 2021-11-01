import { ComputedRef } from 'vue'
import { CascaderItemPropsType } from '../cascader-list/cascader-list-types'
export interface UseClassNameType {
  getRootClass: (j: CascaderItemPropsType) => ComputedRef
}

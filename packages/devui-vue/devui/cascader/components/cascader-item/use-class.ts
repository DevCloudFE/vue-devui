/**
 * 定义组件class
 */
import { computed, ComputedRef } from 'vue';
import { CascaderItemPropsType } from '../cascader-list/cascader-list-types'
import { UseClassNameType } from './cascader-item-types'
export const useClassName = (): UseClassNameType => {
  const getRootClass = (props: CascaderItemPropsType): ComputedRef => {
    const itemProps = props?.cascaderItemNeedProps
    const activeFlg = itemProps?.valueCache[props.ulIndex] === props.cascaderItem?.value
    const disabledFlg = props.cascaderItem?.disabled
    return computed(() => ({
      'devui-cascader-li devui-dropdown-item': true,
      'devui-leaf-active': activeFlg,
      'disabled': disabledFlg
    }))
  }
  return {
    getRootClass
  }
}

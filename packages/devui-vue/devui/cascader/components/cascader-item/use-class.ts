/**
 * 定义组件class
 */
 import { computed, ComputedRef } from 'vue';
 import { CascaderItemPropsType } from '../cascader-list/cascader-list-types'

 export const useClassName= () => {
   const getRootClass = (props: CascaderItemPropsType): ComputedRef => {
    const itemProps = props?.cascaderItemNeedProps
    console.log(itemProps.valueCache)
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
 
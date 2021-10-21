/**
 * 定义组件class
 */
 import { computed, ComputedRef } from 'vue';
 import { CascaderItemPropsType } from '../cascader-list/cascader-list-types'

 export const getRootClass = (props: CascaderItemPropsType): ComputedRef => {
   const activeFlg = props?.cascaderItemNeedProps?.value[props.ulIndex] === props.liIndex
   const disabledFlg = props.cascaderItem?.disabled
   return computed(() => ({
     'devui-cascader-li devui-dropdown-item': true,
     'devui-leaf-active': activeFlg,
     'disabled': disabledFlg
   }))
 }
 
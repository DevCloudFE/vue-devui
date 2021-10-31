/**
 * 定义组件class
 */
 import { computed, ComputedRef } from 'vue';
 import { CascaderulProps } from './cascader-list-types'

 export const getRootClass = (props: CascaderulProps): ComputedRef => {
   return computed(() => ({
     'devui-cascader-ul': true,
     'devui-drop-no-data': props?.cascaderItems?.length === 0
   }))
 }
 
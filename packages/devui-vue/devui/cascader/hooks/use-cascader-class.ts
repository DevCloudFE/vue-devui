/**
 * 定义组件class
 */
import { computed, ComputedRef, Ref } from 'vue';
import { CascaderProps } from '../src/cascader-types'
const TRIGGER_Map = {
  hover: 'hover',
  click: 'click',
}
export const getRootClass = (props: CascaderProps, menuShow: Ref<boolean> ): ComputedRef => {
  return computed(() => ({
    'devui-cascader devui-dropdown devui-dropdown-animation': true,
    'devui-dropdown__open': menuShow.value,
    'devui-cascader__disbaled': props.disabled,
  }))
}

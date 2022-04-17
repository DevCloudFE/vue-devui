/**
 * 定义组件class
 */
import { computed, ComputedRef, Ref } from 'vue';
import { CascaderProps, CascaderulProps, CascaderItemPropsType } from '../src/cascader-types';
// import { UseClassNameType } from '../components/cascader-item/cascader-item-types'

// 根节点class
export const useRootClassName = (props: CascaderProps, menuShow: Ref<boolean>): ComputedRef => {
  return computed(() => ({
    'devui-cascader devui-dropdown devui-dropdown-animation': true,
    'devui-dropdown__open': menuShow.value,
    'devui-cascader__disbaled': props.disabled,
  }));
};

// 弹出层项 class
export const useListClassName = (props: CascaderItemPropsType): ComputedRef => {
  const itemProps = props?.cascaderItemNeedProps;
  const isActive = itemProps?.valueCache[props.ulIndex] === props.cascaderItem?.value;
  const isDisabled = props.cascaderItem?.disabled;
  return computed(() => ({
    'devui-cascader-li devui-dropdown-item': true,
    'devui-leaf-active': isActive,
    'disabled': isDisabled
  }));
};

// 弹出层列 class
export const useUlClassName = (props: CascaderulProps): ComputedRef => {
  return computed(() => ({
    'devui-cascader-ul': true,
    'devui-drop-no-data': props?.cascaderItems?.length === 0
  }));
};

// 为弹出层打开添加全局class
export const dropdownOpenClass = (status: boolean): string => {
  return status ? 'devui-drop-menu-wrapper' : '';
};

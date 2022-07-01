/**
 * 定义组件class
 */
import { computed, ComputedRef, Ref } from 'vue';
import { CascaderProps, CascaderulProps, CascaderItemPropsType } from '../src/cascader-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
const ns = useNamespace('cascader');

// 根节点class
export const useRootClassName = (props: CascaderProps, menuShow: Ref<boolean>): ComputedRef => {
  return computed(() => ({
    [`${ns.b()} ${ns.e('dropdown')} ${ns.em('dropdown', 'animation')}`]: true,
    [ns.em('dropdown', 'open')]: menuShow.value,
    [ns.e('disbaled')]: props.disabled,
  }));
};

// 弹出层项 class
export const useListClassName = (props: CascaderItemPropsType): ComputedRef => {
  const itemProps = props?.cascaderItemNeedProps;
  const isActive = itemProps?.valueCache?.[props.ulIndex] === props.cascaderItem?.value;
  const isDisabled = props.cascaderItem?.disabled;
  return computed(() => ({
    [`${ns.e('li')} dropdown-item`]: true,
    'leaf-active': isActive,
    disabled: isDisabled,
  }));
};

// 弹出层列 class
export const useUlClassName = (props: CascaderulProps): ComputedRef => {
  return computed(() => ({
    [ns.e('ul')]: true,
    [ns.e('drop-no-data')]: props?.cascaderItems?.length === 0,
  }));
};

// 为弹出层打开添加全局class
export const dropdownOpenClass = (status: boolean): string => {
  return status ? `${ns.e('drop-menu-wrapper')}` : '';
};

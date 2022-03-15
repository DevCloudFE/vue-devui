/**
 * 定义组件class
 */
import { computed, ComputedRef } from 'vue';
import { SearchProps } from '../search-types';
const SIZE_CLASS = {
  lg: 'lg',
  sm: 'sm',
} as const;
const ICON_POSITION = {
  right: 'right',
  left: 'left',
};
export const getRootClass = (props: SearchProps): ComputedRef => {
  return computed(() => ({
    'devui-search': true,
    'devui-search__disbaled': props.disabled,
    'devui-search__no-border': props.noBorder,
    [`devui-search__${props.size}`]: SIZE_CLASS[props.size],
    [`devui-search__${props.iconPosition}`]: ICON_POSITION[props.iconPosition],
  }));
};

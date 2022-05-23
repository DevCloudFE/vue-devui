/**
 * 定义组件class
 */
import { computed, ComputedRef } from 'vue';
import type { Ref } from 'vue';
import { SearchProps } from '../search-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

const SIZE_CLASS = {
  lg: 'lg',
  md: 'md',
  sm: 'sm',
} as const;
const ICON_POSITION = {
  right: 'right',
  left: 'left',
};
const ns = useNamespace('search');

export const getRootClass = (props: SearchProps, isFocus: Ref<boolean>): ComputedRef => {
  return computed(() => ({
    [ns.b()]: true,
    [ns.m('focus')]: isFocus.value,
    [ns.m('disabled')]: props.disabled,
    [ns.m('no-border')]: props.noBorder,
    [ns.m(props.size)]: SIZE_CLASS[props.size],
    [ns.m(props.iconPosition)]: ICON_POSITION[props.iconPosition],
  }));
};

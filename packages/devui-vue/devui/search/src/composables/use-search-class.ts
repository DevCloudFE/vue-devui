/**
 * 定义组件class
 */
import { computed, inject } from 'vue';
import type { Ref } from 'vue';
import { UseSearchClassTypes, SearchProps } from '../search-types';
import { FORM_TOKEN } from '../../../form';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export const useSearchClass = (props: SearchProps, isFocus: Ref<boolean>): UseSearchClassTypes => {
  const formContext = inject(FORM_TOKEN, undefined);

  const ICON_POSITION = {
    right: 'right',
    left: 'left',
  };

  const ns = useNamespace('search');

  const searchSize = computed(() => props.size || formContext?.size || 'md');

  const rootClass = computed(() => ({
    [ns.b()]: true,
    [ns.m('focus')]: isFocus.value,
    [ns.m('disabled')]: props.disabled,
    [ns.m('no-border')]: props.noBorder,
    [ns.m(searchSize.value)]: !!searchSize.value,
    [ns.m(props.iconPosition)]: ICON_POSITION[props.iconPosition],
  }));

  return {
    rootClass,
    searchSize
  };
};

import { computed, inject } from 'vue';
import type { SetupContext } from 'vue';
import { ButtonProps, UseButtonReturnType, buttonGroupInjectionKey } from './button-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { isString } from 'lodash';

export default function useButton(props: ButtonProps, ctx: SetupContext): UseButtonReturnType {
  const ns = useNamespace('button');
  const hasContent = computed(() => ctx.slots.default);
  const colorMap = {
    solid: 'primary',
    outline: 'secondary',
    text: 'secondary',
  };
  const defaultColor = colorMap[props.variant];

  const buttonGroupConf = inject(buttonGroupInjectionKey, null);
  const buttonSize = computed(() => {
    return buttonGroupConf?.size.value || props.size;
  });

  const classes = computed(() => ({
    [ns.b()]: true,
    [ns.m(props.variant)]: true,
    [`${ns.m(props.variant)}--${props.color || defaultColor}`]: true,
    [ns.m(buttonSize.value)]: true,
    [ns.e('icon-wrap')]: props.icon,
    [ns.e('icon')]: props.icon && !hasContent.value,
    [ns.m('is-loading')]: props.loading,
    [ns.m(props.shape || '')]: props.shape && isString(props.shape) ? true : false,
  }));

  const iconClass = computed(() => {
    if (!props.icon) {
      return '';
    }
    const origin = `${ns.e('icon-fix')} icon`;
    if (hasContent.value) {
      return `${origin} clear-right-5`;
    } else {
      return origin;
    }
  });

  return { classes, iconClass };
}

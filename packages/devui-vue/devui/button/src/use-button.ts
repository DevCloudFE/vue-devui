import { computed } from 'vue';
import type { SetupContext } from 'vue';
import { ButtonProps, UseButtonReturnType } from './button-types';

export default function useButton(props: ButtonProps, ctx: SetupContext): UseButtonReturnType {
  const hasContent = computed(() => ctx.slots.default);
  const colorMap = {
    solid: 'primary',
    outline: 'secondary',
    text: 'secondary',
  };
  const defaultColor = colorMap[props.variant];

  const classes = computed(() => ({
    'devui-btn': true,
    [`devui-btn-${props.variant}`]: true,
    [`devui-btn-${props.variant}-${props.color || defaultColor}`]: true,
    [`devui-btn-${props.size}`]: true,
    'devui-btn-icon-wrap': props.icon,
    'devui-btn-icon': props.icon && !hasContent.value && props.variant !== 'solid',
  }));
  const iconClass = computed(() => {
    if (!props.icon) {
      return;
    }
    const origin = 'devui-icon-fix icon';
    if (hasContent.value) {
      return `${origin} clear-right-5`;
    } else {
      return origin;
    }
  });

  return { classes, iconClass };
}

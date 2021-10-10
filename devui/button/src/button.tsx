import { computed, defineComponent, ref } from 'vue';
import { Icon } from '../../icon';
import { buttonProps } from './button-types';

import './button.scss';

export default defineComponent({
  name: 'DButton',
  props: buttonProps,
  setup(props, ctx) {
    const buttonContent = ref<HTMLSpanElement | null>(null);

    const onClick = (e: MouseEvent) => {
      if (props.showLoading) {
        return;
      }
      props.onClick?.(e);
    }

    const hasContent = computed(() => ctx.slots.default);

    const btnClass = computed(() => {
      const { btnStyle, size, position, bordered, icon } = props;
      const origin = `devui-btn devui-btn-${btnStyle} devui-btn-${size} devui-btn-${position}`;
      const borderedClazz = bordered ? 'bordered' : '';
      const btnIcon = !!icon && !hasContent.value && btnStyle !== 'primary' ? 'd-btn-icon' : '';
      const btnIconWrap = !!icon ? 'd-btn-icon-wrap' : '';
      return `${origin} ${borderedClazz} ${btnIcon} ${btnIconWrap}`;
    });

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

    return () => {
      const {
        icon,
        type,
        disabled,
        showLoading,
        width
      } = props;
      return (
        <div class="devui-btn-host" {...ctx.attrs}>
          <button
            class={btnClass.value}
            type={type}
            disabled={disabled}
            style={{ width }}
            onClick={onClick}
          // dLoading
          // [showLoading]="showLoading"
          // [loadingTemplateRef]="loadingTemplateRef"
          // [dAutoFocus]="autofocus"
          >
            {!!icon ? (
              <Icon name={props.icon} class={iconClass.value} />
            ) : null}
            <span class="button-content" ref={buttonContent}>
              {ctx.slots.default?.()}
            </span>
          </button>
        </div>
      );
    }
  }
});

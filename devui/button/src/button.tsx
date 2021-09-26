import { computed, defineComponent, ref, PropType } from 'vue';
import { Icon } from '../../icon';

export type IButtonType = 'button' | 'submit' | 'reset';
export type IButtonStyle = 'common' | 'primary' | 'text' | 'text-dark' | 'danger';
export type IButtonPosition = 'left' | 'right' | 'default';
export type IButtonSize = 'lg' | 'md' | 'sm' | 'xs';

import './button.scss';

export default defineComponent({
  name: 'DButton',
  props: {
    type: {
      type: String as PropType<IButtonType>,
      default: 'button'
    },
    btnStyle: {
      type: String as PropType<IButtonStyle>,
      default: 'primary'
    },
    size: {
      type: String as PropType<IButtonSize>,
      default: 'md'
    },
    position: {
      type: String as PropType<IButtonPosition>,
      default: 'default'
    },
    bordered: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    showLoading: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>
    }
  },
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
      const broderedClazz = bordered ? 'bordered' : '';
      const btnIcon = !!icon && !hasContent.value && btnStyle !== 'primary' ? 'd-btn-icon' : '';
      const btnIconWrap = !!icon ? 'd-btn-icon-wrap' : '';
      return `${origin} ${broderedClazz} ${btnIcon} ${btnIconWrap}`;
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
      const hasIcon = !!icon;
      return (
        <div class="devui-btn-host">
          <button
            class={btnClass.value}
            type={type}
            disabled={disabled}
            style={{ width: width }}
            onClick={onClick}
            {...ctx.attrs}
          // dLoading
          // [showLoading]="showLoading"
          // [loadingTemplateRef]="loadingTemplateRef"
          // [dAutoFocus]="autofocus"
          >
            {hasIcon ? (<Icon name={props.icon} class={iconClass.value} />) : null}
            <span class="button-content" ref={buttonContent}>
              {ctx.slots.default?.()}
            </span>
          </button>
        </div>
      );
    }
  }
});
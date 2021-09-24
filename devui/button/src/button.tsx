import { computed, defineComponent, ref } from 'vue';
import { Icon } from '../../icon';

export type IButtonType = 'button' | 'submit' | 'reset';
export type IButtonStyle = 'common' | 'primary' | 'text' | 'text-dark' | 'danger';
export type IButtonPosition = 'left' | 'right' | 'default';
export type IButtonSize = 'lg' | 'md' | 'sm' | 'xs';

import './button.scss';

export default defineComponent({
  name: 'DButton',
  inheritAttrs: false,
  props: {
    id: {
      type: [String, Number]
    },
    type: {
      type: String as () => IButtonType,
      default: 'button'
    },
    bsStyle: {
      type: String as () => IButtonStyle,
      default: 'primary'
    },
    bsSize: {
      type: String as () => IButtonSize,
      default: 'md'
    },
    bsPosition: {
      type: String as () => IButtonPosition,
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
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    btnClick: {
      type: Function as unknown as () => ((event: MouseEvent) => void)
    }
  },
  setup(props, ctx) {
    const buttonContent = ref<HTMLSpanElement | null>(null);

    const onClick = (e: MouseEvent) => {
      if (props.showLoading) {
        return;
      }
      props.btnClick?.(e);
    }

    const hasContent = computed(() => ctx.slots.default);

    const btnClazz = computed(() => {
      const { bsStyle, bsSize, bsPosition, bordered, icon } = props;
      const origin = `devui-btn devui-btn-${bsStyle} devui-btn-${bsSize} devui-btn-${bsPosition}`;
      const broderedClazz = bordered ? 'bordered' : '';
      const btnIcon = !!icon && !hasContent.value && bsStyle !== 'primary' ? 'd-btn-icon' : '';
      const btnIconWrap = !!icon ? 'd-btn-icon-wrap' : '';
      return `${origin} ${broderedClazz} ${btnIcon} ${btnIconWrap}`;
    });

    const iconClazz = computed(() => {
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
        <div style="display: inline-block;">
          <button
            class={btnClazz.value}
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
            {hasIcon ? (<Icon name={props.icon} class={iconClazz.value} />) : null}
            <span class="button-content" ref={buttonContent}>
              {ctx.slots.default?.()}
            </span>
          </button>
        </div>
      );
    }
  }
});
import { computed, defineComponent, ref } from 'vue';
import { useGlobalConfig } from '../../config-provider/global-config';
import { Icon } from '../../icon';
import loadingDirective from '../../loading/src/directive';
import { buttonProps } from './button-types';

import './button.scss'

export default defineComponent({
  name: 'DButton',
  directives: {
    devLoading: loadingDirective
  },
  props: buttonProps,
  setup(props, ctx) {
    const buttonContent = ref<HTMLSpanElement | null>(null)
    const globalConfig = useGlobalConfig()

    const onClick = (e: MouseEvent) => {
      if (props.showLoading) {
        return
      }
      props.onClick?.(e)
    }

    const hasContent = computed(() => ctx.slots.default)

    const btnClass = computed(() => {
      const { btnStyle, size, position, bordered, icon } = props
      const origin = `devui-btn devui-btn-${btnStyle} devui-btn-${
        size ?? globalConfig?.size ?? 'md'
      } devui-btn-${position}`
      const borderedClass = bordered ? 'bordered' : ''
      const btnIcon = !!icon && !hasContent.value && btnStyle !== 'primary' ? 'd-btn-icon' : ''
      const btnIconWrap = !!icon ? 'd-btn-icon-wrap' : ''
      return `${origin} ${borderedClass} ${btnIcon} ${btnIconWrap}`
    })

    const iconClass = computed(() => {
      if (!props.icon) {
        return
      }
      const origin = 'devui-icon-fix icon'
      if (hasContent.value) {
        return `${origin} clear-right-5`
      } else {
        return origin
      }
    })

    return () => {
      const { icon, type, disabled, showLoading, width } = props
      return (

        <div 
          class="devui-btn-host" 
          {...ctx.attrs} 
        >
          <button
            class={btnClass.value}
            type={type}
            disabled={disabled}
            style={{ width }}
            onClick={onClick}
            v-devLoading={showLoading}
          >
            {!!icon ? <Icon name={icon} class={iconClass.value} /> : null}
            <span class='button-content' ref={buttonContent}>
              {ctx.slots.default?.()}
            </span>
          </button>
        </div>
      )
    }
  }
})

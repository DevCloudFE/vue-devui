import { defineComponent, toRefs, ref, CSSProperties, reactive } from 'vue'
import clickoutsideDirective from '../../shared/devui-directive/clickoutside'
import './popover.scss'

type positionType = 'top' | 'right' | 'bottom' | 'left'
type triggerType = 'click' | 'hover'
type popType = 'success' | 'error' | 'warning' | 'info' | 'default'
const popTypeClass = {
  success: { name: 'right-o', color: 'rgb(61, 204, 166)' },
  error: { name: 'error-o', color: 'rgb(249, 95, 91)' },
  info: { name: 'info-o', color: 'rgb(81, 112, 255)' },
  warning: { name: 'warning-o', color: 'rgb(254, 204, 85)' },
  default: {}
}

export default defineComponent({
  name: 'DPopover',
  directives: {
    clickoutside: clickoutsideDirective
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: String as () => positionType,
      default: 'bottom'
    },
    content: {
      type: String,
      default: 'default'
    },

    trigger: {
      type: String as () => triggerType,
      default: 'click',
    },

    zIndex: {
      type: Number as () => CSSProperties,
      default: 1060
    },
    popType: {
      type: String as () => popType,
      default: 'default'
    },
    showAnimation: {
      type: Boolean,
      default: true
    },
    mouseEnterDelay: {
      type: Number,
      default: 150
    },
    mouseLeaveDelay: {
      type: Number,
      default: 100
    }
  },

  setup(props, ctx) {
    let enter = null
    let leave = null
    const visible = ref(props.visible);
    const { position, content, zIndex, trigger, popType, mouseEnterDelay, mouseLeaveDelay, showAnimation } = toRefs(props);
    const isClick = trigger.value === 'click'
    const iconType = reactive(popTypeClass[popType.value])
    const event = function () {
      if (visible.value) {
        visible.value = false;
        return
      }
      visible.value = true
    }
    const onClick = isClick ? event : null;
    const onMouseenter = isClick ? null : () => {
      enter && clearTimeout(enter);
      enter = setTimeout(() => {
        visible.value = true
      }, mouseEnterDelay.value)
    }
    const onMouseleave = isClick ? null : () => {
      leave && clearTimeout(leave)
      leave = setTimeout(() => {
        visible.value = false
      }, mouseLeaveDelay.value)
    }
    const hiddenContext = function () {
      visible.value = false
    }


    return () => {
      const { slots } = ctx;
      const style: CSSProperties = {
        zIndex: zIndex.value
      }

      return (
        <div class={
          ['devui-popover',
            position.value,
            {
              'devui-popover-animation': showAnimation.value,
              'devui-popover-isVisible': visible.value
            }
          ]} >
          <div class='devui-popover-reference' onMouseenter={onMouseenter} onMouseleave={onMouseleave} onClick={onClick} v-clickoutside={hiddenContext}>
            {slots.reference?.()}
          </div>
          <div class={['devui-popover-content', iconType.name ? 'is-icon' : '']} style={style}>
            {iconType.name && <d-icon name={iconType.name} color={iconType.color} class="devui-popover-icon" size="16px" />}
            {slots.content?.() || <span>{content.value}</span>}
          </div>
        </div>
      )
    }
  },
})

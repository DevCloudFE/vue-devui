import './popover.scss'
import { defineComponent, toRefs, ref, CSSProperties } from 'vue'
import clickoutsideDirective from '../../shared/devui-directive/clickoutside'
type positionType = 'top' | 'right' | 'bottom' | 'left'
type triggerType = 'click' | 'hover'
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
      type: [String as () => positionType, Array],
      default: () => {
        return ['top', 'right', 'bottom', 'left']
      }
    },
    content: {
      type: String,
      default: ''
    },

    trigger: {
      type: String as () => triggerType,
      default: 'click',
    },

    zIndex: {
      type: Number as () => CSSProperties,
      default: 1060
    }
  },

  setup(props, ctx) {
    const visible = ref(props.visible);
    const { position, content, zIndex, trigger } = toRefs(props);
    const isClick = trigger.value === 'click'
    const event = function () {
      if (visible.value) {
        visible.value = false;
        return
      }
      visible.value = true
    }
    const onClick = isClick ? event : null;
    const onMouseenter = isClick ? null : () => { visible.value = true }
    const onMouseleave = isClick ? null : () => { visible.value = false }
    const hiddenContext = function () {
      visible.value = false
    }

    return () => {
      const { slots } = ctx;
      const style: CSSProperties = {
        zIndex: zIndex.value
      }
      return (
        <div class={['devui-popover',
          position.value,
          {
            'devui-popover-isVisible': visible.value
          }
        ]}>
          <div class='devui-popover-reference' onMouseenter={onMouseenter} onMouseleave={onMouseleave} onClick={onClick} v-clickoutside={hiddenContext}>
            {slots.reference?.()}
          </div>
          <div class='devui-popover-content' style={style}>
            {slots.content?.() || content.value}
          </div>
        </div>
      )
    }
  },
})

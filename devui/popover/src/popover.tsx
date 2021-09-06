import './popover.scss'
import { defineComponent, toRefs, ref, CSSProperties } from 'vue'
export default defineComponent({
  name: 'DPopover',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: [String, Array],
      default: () => {
        return ['top', 'right', 'bottom', 'left']
      }
    },
    content: {
      type: String,
      default: ''
    },

    // trigger: {
    //   type: String,
    //   default: 'click',
    //   validator: function (value: string) {
    //     return ['click', 'hover'].includes(value);
    //   }
    // },

    zIndex: {
      type: Number as () => CSSProperties,
      default: 1060
    }


  },

  setup(props, ctx) {
    const { position, content, zIndex } = toRefs(props);
    const visible = ref(props.visible);
    const onClick = function () {
      visible.value = !visible.value;
    }

    return () => {
      const { slots } = ctx;
      const style: CSSProperties = {
        zIndex: zIndex.value
      }
      return (
        <div class={['devui-popover', position.value, { 'devui-popover-isVisible': visible.value }]}>
          <div class='devui-popover-content' style={style}>
            {slots.content?.() || content.value}
          </div>
          <div class="devui-popover-reference" onClick={onClick}>
            {slots.reference?.() || content.value}
          </div>
        </div>
      )
    }
  },
})

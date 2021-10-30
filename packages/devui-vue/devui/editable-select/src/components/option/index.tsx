import { defineComponent, renderSlot, getCurrentInstance, inject } from 'vue'
import { className } from '../../utils/index'
import { selectKey } from '../../editable-select-types'
export default defineComponent({
  name: 'DEditableSelectOption',
  props: {
    label: {
      type: [String, Number],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const optionsClassName = className('devui-dropdown-item', {
      disabled: props.disabled,
    })
    const instance = getCurrentInstance()

    const select = inject(selectKey)

    const selectOptionClick = () => {
      if (!props.disabled) {
        select.handleOptionSelect(instance)
      }
    }
    return () => {
      return (
        <li class={optionsClassName} onClick={selectOptionClick}>
          {props.label ? props.label : renderSlot(ctx.slots, 'default')}
        </li>
      )
    }
  },
})

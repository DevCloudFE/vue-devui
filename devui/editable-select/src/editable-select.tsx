import './editable-select.scss'
import {
  defineComponent,
  reactive,
  toRefs,
  renderSlot,
  provide,
  SetupContext,
} from 'vue'
import {
  editableSelectProps,
  EditableSelectProps,
  selectKey,
} from './editable-select-types'
import { Icon } from '../../icon'
import { FlexibleOverlay } from '../../overlay'
import { useSelectStates, useSelect } from './hooks/use-select'
import { className } from './utils/index'
export default defineComponent({
  name: 'DEditableSelect',
  props: editableSelectProps,
  emits: ['update:modelValue'],

  setup(props: EditableSelectProps, ctx: SetupContext) {
    const states = useSelectStates()
    const { origin, visible } = toRefs(states)

    const inputCls = className('devui-form-control devui-dropdown-origin', {
      disabled: props.disabled,
    })
    const { toggleMenu, handleOptionSelect } = useSelect(props, ctx, states)

    provide(
      selectKey,
      reactive({
        handleOptionSelect,
      })
    )

    return () => {
      return (
        <>
          <div
            class="devui-form-group devui-has-feedback"
            onClick={toggleMenu}
            ref={origin}
          >
            <input type="text" class={inputCls} value={props.modelValue} />
            <span class="devui-form-control-feedback">
              <span class="devui-select-chevron-icon">
                <Icon name="select-arrow" />
              </span>
            </span>
          </div>
          <FlexibleOverlay
            backgroundClass="devui-dropdown-bg"
            origin={origin}
            v-model={[visible.value, 'visible']}
            position={states.position}
          >
            <div
              class="devui-editable-select"
              style={{ width: props.width + 'px' }}
            >
              <div class="devui-dropdown-menu">
                <ul
                  class="devui-list-unstyled scroll-height"
                  style={{
                    maxHeight: props.maxHeight + 'px',
                  }}
                >
                  {renderSlot(ctx.slots, 'default')}
                </ul>
              </div>
            </div>
          </FlexibleOverlay>
        </>
      )
    }
  },
})

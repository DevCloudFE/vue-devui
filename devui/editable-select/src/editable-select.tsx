import './editable-select.scss';

import { defineComponent, ref, reactive, renderSlot } from 'vue';
import {
  editableSelectProps,
  EditableSelectProps,
} from './editable-select-types';
import { Icon } from '../../icon';

export default defineComponent({
  name: 'DEditableSelect',
  props: editableSelectProps,
  emits: [],
  setup(props: EditableSelectProps, ctx) {
    const origin = ref(null);
    const visible = ref(false);
    const position = reactive({
      originX: 'left',
      originY: 'bottom',
      overlayX: 'left',
      overlayY: 'top',
    });

    const toggleMenu = () => {
      visible.value = !visible.value;
    };

    return () => {
      return (
        <>
          <div
            class="devui-form-group devui-has-feedback devui-select-open"
            onClick={toggleMenu}
            ref={origin}
          >
            <input
              type="text"
              class="devui-form-control devui-dropdown-origin"
            />
            <span class="devui-form-control-feedback">
              <span class="devui-select-chevron-icon">
                <Icon name="select-arrow" />
              </span>
            </span>
          </div>
          <d-flexible-overlay
            origin={origin}
            v-model={[visible.value, 'visible']}
            position={position}
          >
            <div
              class="devui-dropdown-wrap"
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
          </d-flexible-overlay>
        </>
      );
    };
  },
});

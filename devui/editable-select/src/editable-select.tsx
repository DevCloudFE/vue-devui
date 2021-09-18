import './editable-select.scss';

import { defineComponent, Transition } from 'vue';
import {
  editableSelectProps,
  EditableSelectProps,
} from './editable-select-types';
import { Icon } from '../../icon';
import Dropdown from './components/dropdown';
export default defineComponent({
  name: 'DEditableSelect',
  props: editableSelectProps,
  emits: [],
  setup(props: EditableSelectProps, ctx) {
    return () => {
      const defaultSlot = ctx.slots.default && ctx.slots.default();

      return (
        <div class="devui-form-group devui-has-feedback devui-select-open">
          <input type="text" class="devui-form-control devui-dropdown-origin" />
          <span class="devui-form-control-feedback">
            <span class="devui-select-chevron-icon">
              <Icon name="select-arrow" />
            </span>
          </span>
          <Transition name="fade">
            <Dropdown>{defaultSlot}</Dropdown>
          </Transition>
        </div>
      );
    };
  },
});

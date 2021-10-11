import {
  defineComponent,
  renderSlot,
  computed,
  getCurrentInstance,
  inject,
} from 'vue';
import { className } from '../../utils/index';
import { selectKey } from '../../editable-select-types';
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
    });
    const currentLabel = computed(() => {
      return props.label;
    });
    const instance = getCurrentInstance();

    const select = inject(selectKey);

    const selectOptionClick = () => {
      if (!props.disabled) {
        select.handleOptionSelect(instance);
      }
    };
    return () => {
      return (
        <li class={optionsClassName} onClick={selectOptionClick}>
          {currentLabel.value
            ? currentLabel.value
            : renderSlot(ctx.slots, 'default')}
        </li>
      );
    };
  },
});

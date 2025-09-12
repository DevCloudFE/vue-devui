import { computed, defineComponent } from 'vue';
import { EditableSelectOptionProps, editableSelectOptionProps } from './option-types';
import { useOption } from '../../composables/use-option';

export default defineComponent({
  name: 'DEditableSelectOption',
  props: editableSelectOptionProps,
  emits: ['select'],
  setup(props: EditableSelectOptionProps, ctx) {
    const { optionClasses } = useOption(props);
    const currentLabel = computed(() => props.label || props.value);
    const handleClick = () => {
      if (!props.disabled) {
        ctx.emit('select');
      }
    };
    return () => {
      return (
        <li class={optionClasses.value} onClick={handleClick}>
          {ctx.slots.default ? ctx.slots.default() : currentLabel.value}
        </li>
      );
    };
  },
});

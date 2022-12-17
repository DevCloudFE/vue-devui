import { computed, ComputedRef, inject, toRefs } from 'vue';
import { EditableSelectOptionProps } from '../components/option/option-types';
import { EditableSelectContext, SELECT_KEY } from '../editable-select-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

interface UseOptionReturnType {
  optionClasses: ComputedRef<Record<string, boolean>>;
}

export function useOption(props: EditableSelectOptionProps): UseOptionReturnType {
  const ns = useNamespace('editable-select');
  const select = inject(SELECT_KEY) as EditableSelectContext;
  const { disabled, hovering } = toRefs(props);

  const isSelected = computed(() => {
    return select?.modelValue?.value === props.value;
  });

  const optionClasses = computed(() => ({
    [ns.e('item')]: true,
    [ns.em('item', 'selected')]: isSelected.value,
    [ns.em('item', 'disabled')]: disabled.value,
    [ns.em('item', 'hover')]: hovering.value,
    [ns.em('item', 'no-data-tip')]: !(props.label || props.value),
  }));

  return { optionClasses };
}

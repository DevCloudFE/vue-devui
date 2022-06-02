import { computed, inject, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { OptionProps, UseOptionReturnType } from '../select-types';
import { SELECT_TOKEN } from '../const';
import { className } from '../utils';
import { useNamespace } from '../../../shared/hooks/use-namespace';
export default function useOption(props: OptionProps): UseOptionReturnType {
  const ns = useNamespace('select');
  const select = inject(SELECT_TOKEN, null);
  const currentName = computed(() => {
    return props.name || props.value;
  });

  const isOptionSelected = computed(() => {
    if (!select?.modelValue) {
      return false;
    }
    if (select?.multiple) {
      return Array.isArray(select.modelValue) && select.modelValue.includes(props.value);
    } else {
      return select.modelValue === props.value;
    }
  });

  const optionItem = computed(() => {
    return {
      name: props.name || props.value + '' || '',
      value: props.value,
      create: props.create,
      _checked: false,
    };
  });

  const isObjectOption = ref(!!props.name);

  const selectOptionCls = computed(() => {
    return className(ns.e('item'), {
      active: isOptionSelected.value,
      disabled: props.disabled,
    });
  });

  const optionSelect = (): void => {
    if (!props.disabled) {
      select?.valueChange(optionItem.value, isObjectOption.value);
    }
  };

  const isVisible = computed(() => {
    if (select?.filterQuery) {
      const query = select?.filterQuery.toLocaleLowerCase().trim();
      return currentName.value.toString().toLocaleLowerCase().includes(query);
    } else {
      return true;
    }
  });

  onBeforeMount(() => {
    select?.updateInjectOptions(optionItem.value, 'add');
  });

  onBeforeUnmount(() => {
    select?.updateInjectOptions(optionItem.value, 'delete');
  });

  return {
    currentName,
    selectOptionCls,
    isVisible,
    optionSelect,
  };
}

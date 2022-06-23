import { computed, inject, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { OptionProps, UseOptionReturnType } from '../select-types';
import { SELECT_TOKEN, OPTION_GROUP_TOKEN } from '../const';
import { className } from '../utils';
import { useNamespace } from '../../../shared/hooks/use-namespace';
export default function useOption(props: OptionProps): UseOptionReturnType {
  const ns = useNamespace('select');
  const select = inject(SELECT_TOKEN, null);
  const optionGroup = inject(OPTION_GROUP_TOKEN, null);
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

  const isDisabled = computed(() => props.disabled || (optionGroup?.disabled ? true : false));

  const isObjectOption = ref(!!props.name);

  const selectOptionCls = computed(() => {
    return className(ns.e('item'), {
      active: isOptionSelected.value,
      disabled: isDisabled.value,
    });
  });

  const optionSelect = (): void => {
    if (!isDisabled.value) {
      select?.valueChange(optionItem.value);
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
    select?.updateInjectOptions(optionItem.value, 'add', isObjectOption.value);
  });

  onBeforeUnmount(() => {
    select?.updateInjectOptions(optionItem.value, 'delete', isObjectOption.value);
  });

  return {
    currentName,
    selectOptionCls,
    isVisible,
    optionSelect,
  };
}

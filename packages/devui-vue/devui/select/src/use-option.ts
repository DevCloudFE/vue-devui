import { computed, inject } from 'vue';
import { OptionProps, UseOptionReturnType } from './select-types';
import { SELECT_TOKEN } from './const';
import { className } from './utils';
import { useNamespace } from '../../shared/hooks/use-namespace';
export default function useOption(props: OptionProps): UseOptionReturnType {
  const ns = useNamespace('select');
  const select = inject(SELECT_TOKEN, null);
  const currentLabel = computed(() => {
    return props.label || props.value;
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

  const isOptionDisabled = computed(() => {
    return props.disabled || !!(select?.optionDisabledKey && props.data && props.data[select.optionDisabledKey]);
  });

  const selectOptionCls = computed(() => {
    return className(ns.e('item'), {
      active: isOptionSelected.value,
      disabled: isOptionDisabled.value,
    });
  });

  const optionSelect = (): void => {
    if (!isOptionDisabled.value) {
      select?.valueChange(props.data, props.index);
    }
  };
  return {
    currentLabel,
    selectOptionCls,
    optionSelect,
  };
}

import { computed, Ref, ref } from 'vue';
import { UseSelectFunctionReturn, SelectProps } from '../select-types';

export default function useSelectFunction(props: SelectProps, selectRef: Ref<HTMLElement | undefined>): UseSelectFunctionReturn {
  const isSelectFocus = ref(false);
  const inputRef = computed(() => {
    const selectContentRefs = selectRef.value?.$refs;
    return selectContentRefs.input as HTMLElement;
  });
  const focus = () => {
    if (!props.disabled) {
      isSelectFocus.value = true;
    }
    inputRef?.value?.focus();
  };
  const blur = () => {
    if (!props.disabled) {
      isSelectFocus.value = false;
    }
    inputRef?.value?.blur();
  };

  return { isSelectFocus, focus, blur };
}

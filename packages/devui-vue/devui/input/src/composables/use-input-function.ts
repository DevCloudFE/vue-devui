import { computed } from 'vue';
import type { ShallowRef } from 'vue';
import { UseInputFunction } from '../input-types';

export function useInputFunction(input: ShallowRef<HTMLInputElement | undefined>): UseInputFunction {
  const refInput = computed(() => input.value);
  const select = () => {
    refInput.value?.select();
  };
  const focus = () => {
    refInput.value?.focus();
  };
  const blur = () => {
    refInput.value?.blur();
  };

  return { select, focus, blur };
}

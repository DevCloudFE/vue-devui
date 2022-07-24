import { computed, Ref, ComputedRef } from 'vue';
import { OptionObjectItem } from '../editable-select-types';
interface useFilterOptionsReturnType {
  filteredOptions: ComputedRef<OptionObjectItem[]>;
}

export function useFilterOptions(
  enableLazyLoad: boolean,
  normalizeOptions: ComputedRef<OptionObjectItem[]>,
  inputValue: Ref<string>,
  searchFn: (option: OptionObjectItem, term: string) => boolean
): useFilterOptionsReturnType {
  const filteredOptions = computed(() => {
    if (!inputValue.value || enableLazyLoad) {
      return normalizeOptions.value;
    }

    return normalizeOptions.value.filter((option) => {
      return searchFn(option, inputValue.value);
    });
  });
  return { filteredOptions };
}

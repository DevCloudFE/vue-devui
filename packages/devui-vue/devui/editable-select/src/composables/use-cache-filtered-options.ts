import { computed, ComputedRef } from 'vue';
import { OptionObjectItem } from '../editable-select-types';

type OptionValue = OptionObjectItem['value'];
interface getOptionValueFunc {
  getOptionValue: (option: OptionObjectItem) => string | number | undefined;
}

export function useCacheFilteredOptions(filteredOptions: ComputedRef<OptionObjectItem[]>): getOptionValueFunc {
  const cacheFilteredOptions = computed(() => {
    const map = new Map<OptionObjectItem, OptionValue>();
    filteredOptions.value.forEach((item) => {
      map.set(item, item.value);
    });
    return map;
  });
  const getOptionValue = (option: OptionObjectItem) => cacheFilteredOptions.value.get(option);
  return {
    getOptionValue,
  };
}

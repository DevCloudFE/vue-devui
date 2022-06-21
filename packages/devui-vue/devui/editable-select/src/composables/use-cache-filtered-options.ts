import { computed, ComputedRef } from 'vue';
import { OptionObjectItem } from '../editable-select-types';

type OptionLabel = OptionObjectItem['label'];
type OptionValue = OptionObjectItem['value'];
interface getOptionValueFunc {
  getOptionValue: (label: string) => string | number | undefined;
}

export const useCacheFilteredOptions = (filteredOptions: ComputedRef<OptionObjectItem[]>): getOptionValueFunc => {
  const cacheFilteredOptions = computed(() => {
    const map = new Map<OptionLabel, OptionValue>();
    filteredOptions.value.forEach((item) => {
      map.set(item.label, item.value);
    });
    return map;
  });
  const getOptionValue = (label: string) => cacheFilteredOptions.value.get(label);
  return {
    getOptionValue,
  };
};

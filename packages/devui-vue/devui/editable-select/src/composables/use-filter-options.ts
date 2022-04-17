import { computed, Ref, ComputedRef } from 'vue';
import { OptionObjectItem } from '../editable-select-types';

const getFilterFunc = () => (val: string, option: OptionObjectItem) =>
  option.label.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1;

export const userFilterOptions = (
  normalizeOptions: ComputedRef<OptionObjectItem[]>,
  inputValue: Ref<string>,
  filterOption: boolean | ((val: string, option: OptionObjectItem) => boolean) | undefined
): ComputedRef<OptionObjectItem[]> =>
  computed(() => {
    const filteredOptions: OptionObjectItem[] = [];

    if (!inputValue.value || filterOption === false) {
      return normalizeOptions.value;
    }

    const filterFunc = typeof filterOption === 'function' ? filterOption : getFilterFunc();

    normalizeOptions.value.forEach((option) => {
      if (filterFunc(inputValue.value, option)) {
        filteredOptions.push(option);
      }
    });
    return filteredOptions;
  });

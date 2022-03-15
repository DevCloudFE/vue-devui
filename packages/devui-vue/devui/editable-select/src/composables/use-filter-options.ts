import { computed, Ref, ComputedRef } from 'vue';
import { OptionObjectItem } from '../editable-select-type';

const getFilterFunc = () => (val: string, option: OptionObjectItem) =>
  option.label.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1;

export const userFilterOptions: (
  normalizeOptions: ComputedRef<OptionObjectItem[]>,
  inputValue: Ref<string>,
  filteredOptions: boolean | ((val: string, option: OptionObjectItem) => boolean)
) => ComputedRef<OptionObjectItem[]> = (normalizeOptions, inputValue, filterOption) =>
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

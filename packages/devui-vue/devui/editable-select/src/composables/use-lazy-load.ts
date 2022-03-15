import { Ref } from 'vue';
import { OptionObjectItem } from '../editable-select-type';

interface useLazyLoadReturenType {
  loadMore: () => void;
}
export const useLazyLoad: (
  dropdownRef: Ref,
  inputValue: Ref<string>,
  filterOtion: boolean | ((val: string, option: OptionObjectItem) => boolean),
  load: (val: string) => void
) => useLazyLoadReturenType = (dropdownRef, inputValue, filterOtion, load) => {
  const loadMore = () => {
    if (filterOtion !== false) {return;}

    if (
      dropdownRef.value.clientHeight + dropdownRef.value.scrollTop >=
      dropdownRef.value.scrollHeight
    ) {
      load(inputValue.value);
    }
  };

  return { loadMore };
};

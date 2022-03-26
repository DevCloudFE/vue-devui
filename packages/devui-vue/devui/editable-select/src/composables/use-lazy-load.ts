import { Ref, SetupContext } from 'vue';
import { OptionObjectItem } from '../editable-select-type';

interface useLazyLoadReturenType {
  loadMore: () => void;
}
export const useLazyLoad: (
  dropdownRef: Ref<HTMLElement>,
  inputValue: Ref<string>,
  filterOtion: boolean | ((val: string, option: OptionObjectItem) => boolean) | undefined,
  ctx: SetupContext
) => useLazyLoadReturenType = (dropdownRef, inputValue, filterOtion, ctx) => {
  const dropdownVal = dropdownRef.value;
  const loadMore = () => {
    if (filterOtion !== false) {
      return;
    }

    if (dropdownVal.clientHeight + dropdownVal.scrollTop >= dropdownVal.scrollHeight) {
      ctx.emit('loadMore', inputValue.value);
    }
  };
  return { loadMore };
};

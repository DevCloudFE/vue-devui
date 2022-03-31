import { Ref, SetupContext } from 'vue';
import { OptionObjectItem } from '../editable-select-types';

interface useLazyLoadReturenType {
  loadMore: () => void;
}
export const useLazyLoad = (
  dropdownRef: Ref<HTMLElement>,
  inputValue: Ref<string>,
  filterOtion: boolean | ((val: string, option: OptionObjectItem) => boolean) | undefined,
  ctx: SetupContext
): useLazyLoadReturenType => {
  const loadMore = () => {
    const dropdownVal = dropdownRef.value;

    if (filterOtion !== false) {
      return;
    }

    if (dropdownVal.clientHeight + dropdownVal.scrollTop >= dropdownVal.scrollHeight) {
      ctx.emit('loadMore', inputValue.value);
    }
  };
  return { loadMore };
};

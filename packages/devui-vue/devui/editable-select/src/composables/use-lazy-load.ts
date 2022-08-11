import { Ref, SetupContext } from 'vue';

interface useLazyLoadReturenType {
  loadMore: () => void;
}

export function useLazyLoad(dropdownRef: Ref<HTMLElement>, enableLazyLoad: boolean, ctx: SetupContext): useLazyLoadReturenType {
  const loadMore = () => {
    const dropdownVal = dropdownRef.value;

    if (!enableLazyLoad) {
      return;
    }

    if (dropdownVal.clientHeight + dropdownVal.scrollTop >= dropdownVal.scrollHeight - 12) {
      ctx.emit('loadMore');
    }
  };
  return { loadMore };
}

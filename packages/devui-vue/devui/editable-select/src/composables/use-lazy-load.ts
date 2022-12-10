import { Ref, SetupContext, toRefs } from 'vue';
import { EditableSelectProps } from '../editable-select-types';
import { States } from './use-select';

interface useLazyLoadReturenType {
  loadMore: () => void;
}

export function useLazyLoad(
  dropdownRef: Ref<HTMLElement | undefined>,
  props: EditableSelectProps,
  states: States,
  ctx: SetupContext
): useLazyLoadReturenType {
  const { enableLazyLoad } = toRefs(props);
  const loadMore = () => {
    if (!dropdownRef.value || !enableLazyLoad.value) {
      return;
    }
    if (dropdownRef?.value.clientHeight + dropdownRef.value.scrollTop >= dropdownRef.value.scrollHeight - 12) {
      ctx.emit('loadMore');
    }
  };
  return { loadMore };
}

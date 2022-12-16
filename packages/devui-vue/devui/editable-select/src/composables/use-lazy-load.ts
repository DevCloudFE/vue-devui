import { Ref, SetupContext, toRefs } from 'vue';
import { EditableSelectProps } from '../editable-select-types';
interface UseLazyLoadReturnType {
  loadMore: () => void;
}

export function useLazyLoad(
  dropdownRef: Ref<HTMLElement | undefined>,
  props: EditableSelectProps,
  ctx: SetupContext
): UseLazyLoadReturnType {
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

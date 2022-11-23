import { ref, Ref, SetupContext } from 'vue';
import {
  HandleSearch,
  RecentlyFocus,
  InputDebounceCb,
  TransInputFocusEmit,
  SourceType,
  UseInputHandle,
} from '../auto-complete-types';
export default function useInputHandle(
  ctx: SetupContext,
  searchList: Ref<SourceType>,
  showNoResultItemTemplate: Ref<boolean>,
  modelValue: Ref<string>,
  isDisabled: Ref<boolean>,
  delay: Ref<number>,
  handleSearch: HandleSearch,
  transInputFocusEmit: Ref<TransInputFocusEmit>,
  recentlyFocus: RecentlyFocus,
  latestSource: Ref
): UseInputHandle {
  const visible = ref(false);
  const inputRef = ref();
  const searchStatus = ref(false);
  const isFocus = ref(false);
  const debounce = (cb: InputDebounceCb, time: number) => {
    let timer: NodeJS.Timeout | null;
    return (arg: string) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        searchStatus.value = true;
        await cb(arg);
        searchStatus.value = false;
      }, time);
    };
  };
  const onInputCb = async (value: string) => {
    await handleSearch(value);
    visible.value = true;
  };
  const onInputDebounce = debounce(onInputCb, delay.value);
  const onInput = (e: Event) => {
    const inp = e.target as HTMLInputElement;
    searchStatus.value = false;
    showNoResultItemTemplate.value = false;
    ctx.emit('update:modelValue', inp.value);
    onInputDebounce(inp.value);
  };
  const onFocus = () => {
    isFocus.value = true;
    handleSearch(modelValue.value);
    recentlyFocus(latestSource?.value);
    transInputFocusEmit.value && transInputFocusEmit.value();
  };
  const onBlur = () => {
    isFocus.value = false;
    ctx.emit('blur');
  };
  const onClear = () => {
    ctx.emit('update:modelValue', '');
    ctx.emit('clear');
  };
  const handleClose = () => {
    visible.value = false;
    searchStatus.value = false;
    showNoResultItemTemplate.value = false;
  };
  const toggleMenu = () => {
    if (!isDisabled.value) {
      if (visible.value) {
        handleClose();
      } else {
        visible.value = true;
        if (ctx.slots.noResultItemTemplate && searchList.value.length === 0 && modelValue.value.trim() !== '') {
          showNoResultItemTemplate.value = true;
        }
      }
    }
  };
  return {
    handleClose,
    toggleMenu,
    onInput,
    onFocus,
    onBlur,
    onClear,
    isFocus,
    inputRef,
    visible,
    searchStatus,
  };
}

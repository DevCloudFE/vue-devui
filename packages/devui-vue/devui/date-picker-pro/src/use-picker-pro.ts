import { shallowRef, reactive, ref } from 'vue';
import type { SetupContext } from 'vue';
import { PickerProProps, UseDatePickerProReturnType } from './date-picker-pro-types';
import { onClickOutside } from '@vueuse/core';

export default function usePickerPro(props: PickerProProps, ctx: SetupContext): UseDatePickerProReturnType {
  const containerRef = shallowRef<HTMLElement>();
  const originRef = ref<HTMLElement>();
  const inputRef = shallowRef<HTMLElement>();
  const overlayRef = shallowRef<HTMLElement>();

  const state = reactive({
    show: false,
    value: '',
    placeholder: props.placeholder,
  });

  const toggleChange = (bool: boolean) => {
    state.show = bool;
    ctx.emit('toggle-change', bool);
  };

  onClickOutside(containerRef, () => {
    toggleChange(false);
  });

  const onFocus = function (e: MouseEvent) {
    e.stopPropagation();
    toggleChange(true);
  };

  return { containerRef, originRef, inputRef, overlayRef, state, onFocus };
}

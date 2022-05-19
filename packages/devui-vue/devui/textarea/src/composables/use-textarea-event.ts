import type { Ref, SetupContext } from 'vue';
import { UseTextareaEvent } from '../textarea-types';

export function useTextareaEvent(isFocus: Ref<boolean>, ctx: SetupContext): UseTextareaEvent {
  const onFocus = (e: FocusEvent) => {
    isFocus.value = true;
    ctx.emit('focus', e);
  };

  const onBlur = (e: FocusEvent) => {
    isFocus.value = false;
    ctx.emit('blur', e);
  };

  const onInput = (e: Event) => {
    ctx.emit('update:modelValue', (e.target as HTMLInputElement).value);
  };

  const onChange = (e: Event) => {
    ctx.emit('change', (e.target as HTMLInputElement).value);
  };

  const onKeydown = (e: KeyboardEvent) => {
    ctx.emit('keydown', e);
  };

  return { onFocus, onBlur, onInput, onChange, onKeydown };
}

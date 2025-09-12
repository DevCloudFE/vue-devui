import { inject, Ref, SetupContext } from 'vue';
import { FormItemContext, FORM_ITEM_TOKEN } from '../../../form';
import { TextareaProps, UseTextareaEvent } from '../textarea-types';

export function useTextareaEvent(isFocus: Ref<boolean>, props: TextareaProps, ctx: SetupContext): UseTextareaEvent {
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined) as FormItemContext;
  const onFocus = (e: FocusEvent) => {
    isFocus.value = true;
    ctx.emit('focus', e);
  };

  const onBlur = (e: FocusEvent) => {
    isFocus.value = false;
    ctx.emit('blur', e);
    if (props.validateEvent) {
      formItemContext?.validate('blur').catch((err) => console.warn(err));
    }
  };

  const onInput = (e: Event) => {
    ctx.emit('update:modelValue', (e.target as HTMLInputElement).value);
    ctx.emit('update', (e.target as HTMLInputElement).value);
  };

  const onChange = (e: Event) => {
    ctx.emit('change', (e.target as HTMLInputElement).value);
  };

  const onKeydown = (e: KeyboardEvent) => {
    ctx.emit('keydown', e);
  };

  return { onFocus, onBlur, onInput, onChange, onKeydown };
}

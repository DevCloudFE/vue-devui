import { inject, ref } from 'vue';
import type { Ref, SetupContext } from 'vue';
import { FORM_ITEM_TOKEN, FormItemContext } from '../../../form/src/components/form-item/form-item-types';
import { InputProps } from '../input-types';

export function useInputEvent(isFocus: Ref<boolean>, props: InputProps, ctx: SetupContext, focus: () => void) {
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined) as FormItemContext;
  const isComposition = ref(false);
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
    ctx.emit('input', (e.target as HTMLInputElement).value);
    if (isComposition.value) {
      return;
    }
    ctx.emit('update:modelValue', (e.target as HTMLInputElement).value);
  };

  const onChange = (e: Event) => {
    ctx.emit('change', (e.target as HTMLInputElement).value);
  };

  const onKeydown = (e: KeyboardEvent) => {
    ctx.emit('keydown', e);
  };

  const onClear = () => {
    ctx.emit('update:modelValue', '');
    ctx.emit('clear');
    focus();
  };

  const onCompositionStart = () => {
    isComposition.value = true;
  };

  const onCompositionUpdate = (e: CompositionEvent) => {
    const text = (e.target as HTMLInputElement)?.value;
    const lastCharacter = text[text.length - 1] || '';
    isComposition.value = !/([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi.test(lastCharacter);
  };

  const onCompositionEnd = (e: CompositionEvent) => {
    if (isComposition.value) {
      isComposition.value = false;
      onInput(e);
    }
  };

  return { onFocus, onBlur, onInput, onChange, onKeydown, onClear, onCompositionStart, onCompositionUpdate, onCompositionEnd };
}

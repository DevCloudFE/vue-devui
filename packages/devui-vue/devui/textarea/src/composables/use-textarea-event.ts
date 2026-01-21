import { inject, Ref, SetupContext, ref } from 'vue';
import { FormItemContext, FORM_ITEM_TOKEN } from '../../../form';
import { TextareaProps, UseTextareaEvent } from '../textarea-types';

export function useTextareaEvent(isFocus: Ref<boolean>, props: TextareaProps, ctx: SetupContext) {
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
    if (isComposition.value) {
      return;
    }
    ctx.emit('update:modelValue', (e.target as HTMLInputElement).value);
    ctx.emit('update', (e.target as HTMLInputElement).value);
  };

  const onChange = (e: Event) => {
    ctx.emit('change', (e.target as HTMLInputElement).value);
  };

  const onKeydown = (e: KeyboardEvent) => {
    ctx.emit('keydown', e);
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

  return { onFocus, onBlur, onInput, onChange, onKeydown, onCompositionStart, onCompositionUpdate, onCompositionEnd };
}

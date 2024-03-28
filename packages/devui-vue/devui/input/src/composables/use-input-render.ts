import { computed, inject, toRefs, ref } from 'vue';
import type { SetupContext } from 'vue';
import { FORM_TOKEN, FormContext, FORM_ITEM_TOKEN, FormItemContext, STYLE_TOKEN } from '../../../form';
import { InputProps, UseInputRender } from '../input-types';
import { useNamespace } from '@devui/shared/utils';

export function useInputRender(props: InputProps, ctx: SetupContext): UseInputRender {
  const formContext = inject(FORM_TOKEN, undefined) as FormContext;
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined) as FormItemContext;
  const isValidateError = computed(() => formItemContext?.validateState === 'error');
  const ns = useNamespace('input');
  const slotNs = useNamespace('input-slot');
  const isFocus = ref(false);
  const { error, size, disabled, showGlowStyle } = toRefs(props);
  const slots = ctx.slots;
  const inputDisabled = computed(() => disabled.value || formContext?.disabled);
  const inputSize = computed(() => size?.value || formContext?.size || '');

  const styleType = inject(STYLE_TOKEN, undefined);

  const { style, class: customClass, ...otherAttrs } = ctx.attrs;
  const customStyle = { style };

  const wrapClasses = computed(() => ({
    [ns.e('wrapper')]: true,
    [ns.m('focus')]: isFocus.value,
    [ns.m('disabled')]: inputDisabled.value,
    [ns.m('glow-style')]: showGlowStyle.value,
    [ns.m('error')]: error.value || isValidateError.value,
    [ns.m('feedback')]: Boolean(formItemContext?.validateState) && formItemContext?.showFeedback,
  }));

  const inputClasses = computed(() => [
    {
      [ns.b()]: true,
      [ns.m(inputSize.value)]: Boolean(inputSize.value),
      [slotNs.b()]: slots.prepend || slots.append,
      [ns.m('append')]: slots.append,
      [ns.m('prepend')]: slots.prepend,
      [ns.m('gray-style')]: styleType === 'gray',
    },
    customClass,
  ]);

  return { inputDisabled, inputSize, isFocus, wrapClasses, inputClasses, customStyle, otherAttrs };
}

import { computed, inject, toRefs, ref } from 'vue';
import type { SetupContext } from 'vue';
import { FORM_ITEM_TOKEN, FormItemContext } from '../../../form/src/components/form-item/form-item-types';
import { InputProps, UseInputRender } from '../input-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export function useInputRender(props: InputProps, ctx: SetupContext): UseInputRender {
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined) as FormItemContext;
  const isValidateError = computed(() => formItemContext?.validateState === 'error');
  const ns = useNamespace('input');
  const slotNs = useNamespace('input-slot');
  const isFocus = ref(false);
  const { error, size, disabled } = toRefs(props);
  const slots = ctx.slots;

  const { style, class: customClass, ...otherAttrs } = ctx.attrs;
  const customStyle = { style };

  const wrapClasses = computed(() => ({
    [ns.e('wrapper')]: true,
    [ns.m('focus')]: isFocus.value,
    [ns.m('disabled')]: disabled.value,
    [ns.m('error')]: error.value || isValidateError.value,
    [ns.m('feedback')]: formItemContext?.showFeedback,
  }));

  const inputClasses = computed(() => [
    {
      [ns.b()]: true,
      [ns.m(size.value)]: true,
      [slotNs.b()]: slots.prepend || slots.append,
      [ns.m('append')]: slots.append,
      [ns.m('prepend')]: slots.prepend,
    },
    customClass,
  ]);

  return { isFocus, wrapClasses, inputClasses, customStyle, otherAttrs };
}

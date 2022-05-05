import { computed, inject, toRefs, ref } from 'vue';
import { FORM_ITEM_TOKEN, FormItemContext } from '../../../form/src/components/form-item/form-item-types';
import { InputProps, UseInputRender } from '../input-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export function useInputRender(props: InputProps): UseInputRender {
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined) as FormItemContext;
  const isValidateError = computed(() => formItemContext?.validateState === 'error');
  const ns = useNamespace('input');
  const isFocus = ref(false);
  const { error, size, disabled } = toRefs(props);

  const wrapClasses = computed(() => ({
    [ns.b()]: true,
    [ns.m('focus')]: isFocus.value,
    [ns.m('disabled')]: disabled.value,
    [ns.m('error')]: error.value || isValidateError.value,
    [ns.m('feedback')]: formItemContext?.showFeedback,
    [ns.m(size.value)]: true,
  }));

  return { isFocus, wrapClasses };
}

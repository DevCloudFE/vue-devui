import { computed, toRefs, ref, inject } from 'vue';
import { FORM_TOKEN, FormContext, FORM_ITEM_TOKEN, FormItemContext } from '../../../form';
import { TextareaProps, UseTextareaRender } from '../textarea-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export function useTextareaRender(props: TextareaProps): UseTextareaRender {
  const formContext = inject(FORM_TOKEN, undefined) as FormContext;
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined) as FormItemContext;
  const ns = useNamespace('textarea');
  const isValidateError = computed(() => formItemContext?.validateState === 'error');
  const isFocus = ref(false);
  const { error, disabled } = toRefs(props);
  const textareaDisabled = computed(() => disabled.value || formContext?.disabled);

  const wrapClasses = computed(() => ({
    [ns.b()]: true,
    [ns.m('focus')]: isFocus.value,
    [ns.m('disabled')]: textareaDisabled.value,
    [ns.m('error')]: error.value || isValidateError.value,
    [ns.m('feedback')]: Boolean(formItemContext?.validateState) && formItemContext?.showFeedback,
  }));

  return { isFocus, textareaDisabled, wrapClasses };
}

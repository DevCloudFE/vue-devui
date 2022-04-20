import { computed, reactive, inject, toRefs } from 'vue';
import { FORM_TOKEN, FormContext } from '../../form-types';
import { FormControlProps, UseFormControl } from './form-control-types';
import { FormItemContext, FORM_ITEM_TOKEN } from '../form-item/form-item-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';

export function useFormControl(props: FormControlProps): UseFormControl {
  const formContext = inject(FORM_TOKEN) as FormContext;
  const labelData = reactive(formContext.labelData);
  const ns = useNamespace('form');
  const { feedbackStatus } = toRefs(props);

  const controlClasses = computed(() => ({
    [`${ns.e('control')}`]: true,
    [`${ns.em('control', 'horizontal')}`]: labelData.layout === 'horizontal',
  }));

  const controlContainerClasses = computed(() => ({
    [`${ns.e('control-container')}`]: true,
    [`${ns.em('control-container', 'horizontal')}`]: labelData.layout === 'horizontal',
    [`${ns.em('control-container', 'has-feedback')}`]: Boolean(feedbackStatus.value),
    [`${ns.em('control-container', 'feedback-error')}`]: Boolean(feedbackStatus.value === 'error'),
  }));

  return { controlClasses, controlContainerClasses };
}

export function useFormControlValidate() {
  const formItemContext = inject(FORM_ITEM_TOKEN) as FormItemContext;
  const errorMessage = computed(() => formItemContext.validateMessage);

  return { errorMessage };
}

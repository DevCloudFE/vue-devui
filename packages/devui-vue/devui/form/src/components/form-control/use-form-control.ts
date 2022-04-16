import { computed, reactive, inject, toRefs } from 'vue';
import { FORM_TOKEN, IForm } from '../../form-types';
import { FormControlProps, UseFormControl } from './form-control-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';

export function useFormControl(props: FormControlProps): UseFormControl {
  const Form = reactive(inject(FORM_TOKEN) as IForm);
  const labelData = reactive(Form.labelData);
  const ns = useNamespace('form');
  const { feedbackStatus } = toRefs(props);

  const controlContainerClasses = computed(() => ({
    [`${ns.e('control-container')}`]: true,
    [`${ns.em('control-container', 'horizontal')}`]: labelData.layout === 'horizontal',
    [`${ns.em('control-container', 'has-feedback')}`]: Boolean(feedbackStatus.value),
    [`${ns.em('control-container', 'feedback-error')}`]: Boolean(feedbackStatus.value === 'error'),
  }));

  return { controlContainerClasses };
}

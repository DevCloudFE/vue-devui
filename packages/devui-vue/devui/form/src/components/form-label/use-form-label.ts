import { computed, reactive, inject, toRefs } from 'vue';
import { FORM_TOKEN, IForm } from '../../form-types';
import { FormLabelProps, UseFormLabel } from './form-label-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';

export function useFormLabel(props: FormLabelProps): UseFormLabel {
  const Form = reactive(inject(FORM_TOKEN) as IForm);
  const labelData = reactive(Form.labelData);
  const ns = useNamespace('form');
  const { required } = toRefs(props);

  const labelClasses = computed(() => ({
    [`${ns.e('label')}`]: true,
    [`${ns.em('label', labelData.labelSize)}`]: labelData.layout === 'horizontal',
    [`${ns.em('label', labelData.labelAlign)}`]: labelData.layout === 'horizontal',
  }));

  const labelInnerClasses = computed(() => ({
    [`${ns.em('label', 'required')}`]: required.value,
  }));

  return { labelClasses, labelInnerClasses };
}

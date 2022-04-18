import { computed, reactive, inject } from 'vue';
import { FORM_TOKEN, IForm } from '../../form-types';
import { UseFormItem } from './form-item-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';

export function useFormItem(): UseFormItem {
  const Form = reactive(inject(FORM_TOKEN) as IForm);
  const labelData = reactive(Form.labelData);
  const ns = useNamespace('form');

  const itemClasses = computed(() => ({
    [`${ns.em('item', 'horizontal')}`]: labelData.layout === 'horizontal',
    [`${ns.em('item', 'vertical')}`]: labelData.layout === 'vertical',
  }));

  return { itemClasses };
}

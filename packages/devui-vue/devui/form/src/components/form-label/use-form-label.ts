import { computed, inject } from 'vue';
import { FormItemContext, FORM_ITEM_TOKEN, LabelData, LABEL_DATA } from '../form-item/form-item-types';
import { UseFormLabel } from './form-label-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';

export function useFormLabel(): UseFormLabel {
  const formItemContext = inject(FORM_ITEM_TOKEN) as FormItemContext;
  const labelData = inject(LABEL_DATA) as LabelData;
  const ns = useNamespace('form');

  const labelClasses = computed(() => ({
    [`${ns.e('label')}`]: true,
    [`${ns.em('label', 'vertical')}`]: labelData.value.layout === 'vertical',
    [`${ns.em('label', labelData.value.labelSize)}`]: labelData.value.layout === 'horizontal',
    [`${ns.em('label', labelData.value.labelAlign)}`]: labelData.value.layout === 'horizontal',
  }));

  const labelInnerClasses = computed(() => ({
    [`${ns.e('label-span')}`]: true,
    [`${ns.em('label', 'required')}`]: formItemContext.isRequired,
  }));

  return { labelClasses, labelInnerClasses };
}

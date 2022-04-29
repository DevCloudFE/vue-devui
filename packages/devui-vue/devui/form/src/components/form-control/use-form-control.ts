import { computed, inject, toRefs } from 'vue';
import { FORM_TOKEN, FormContext } from '../../form-types';
import { FormControlProps, UseFormControl } from './form-control-types';
import { FormItemContext, FORM_ITEM_TOKEN } from '../form-item/form-item-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';

export function useFormControl(props: FormControlProps): UseFormControl {
  const formContext = inject(FORM_TOKEN) as FormContext;
  const ns = useNamespace('form');
  const { feedbackStatus } = toRefs(props);

  const controlClasses = computed(() => ({
    [ns.e('control')]: true,
    [ns.em('control', 'horizontal')]: formContext.layout === 'horizontal',
  }));

  const controlContainerClasses = computed(() => ({
    [ns.e('control-container')]: true,
    [ns.em('control-container', 'horizontal')]: formContext.layout === 'horizontal',
    [ns.em('control-container', 'has-feedback')]: Boolean(feedbackStatus?.value),
    [ns.em('control-container', 'feedback-error')]: Boolean(feedbackStatus?.value === 'error'),
  }));

  return { controlClasses, controlContainerClasses };
}

export function useFormControlValidate() {
  const formItemContext = inject(FORM_ITEM_TOKEN) as FormItemContext;
  const feedbackStatus = computed(() => formItemContext.validateState);
  const showFeedback = computed(() => formItemContext.showFeedback && Boolean(formItemContext.validateState));
  const showPopover = computed(() => formItemContext.messageType === 'popover' && formItemContext.validateState === 'error');
  const showMessage = computed(() => formItemContext.messageType === 'text' && formItemContext.validateState === 'error');
  const errorMessage = computed(() => formItemContext.validateMessage);
  const popPosition = computed(() => formItemContext.popPosition);

  return { feedbackStatus, showFeedback, showPopover, showMessage, errorMessage, popPosition };
}

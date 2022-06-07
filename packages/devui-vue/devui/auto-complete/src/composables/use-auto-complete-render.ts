import { computed, ComputedRef, inject, watch } from 'vue';
import type { SetupContext, Ref } from 'vue';
import { FORM_ITEM_TOKEN } from '../../../form';
import { AutoCompleteProps, UseAutoCompleteRender, AutoCompleteSize } from '../auto-complete-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export function useAutoCompleteRender(
  props: AutoCompleteProps,
  ctx: SetupContext,
  visible: Ref<boolean>,
  isFocus: Ref<boolean>,
  isDisabled: ComputedRef<boolean>,
  autoCompleteSize: ComputedRef<AutoCompleteSize>
): UseAutoCompleteRender {
  const formItemContext = inject(FORM_ITEM_TOKEN, undefined);
  const ns = useNamespace('auto-complete');
  const inputNs = useNamespace('auto-complete-input');
  const slotNs = useNamespace('auto-complete-slot');
  const formNs = useNamespace('form-group');
  const feedbackNs = useNamespace('has-feedback');
  const selectNs = useNamespace('select-open');
  const formControlNs = useNamespace('form-control');
  const dropdownNs = useNamespace('dropdown-origin');
  const dropdownOpenNs = useNamespace('dropdown-origin-open');
  const slots = ctx.slots;
  const isValidatorError = computed(() => formItemContext?.validateState === 'error');

  const autoCompleteTopClasses = computed(() => ({
    [ns.b()]: true,
    [ns.m(autoCompleteSize.value)]: true,
    [formNs.b()]: true,
    [feedbackNs.b()]: true,
    [selectNs.b()]: visible.value,
  }));

  const inputClasses = computed(() => ({
    [inputNs.b()]: true,
    [ns.m('focus')]: isFocus.value,
    [slotNs.b()]: slots.prepend || slots.append || props.prefix || props.suffix,
    [ns.m('append')]: slots.append,
    [ns.m('prepend')]: slots.prepend,
  }));

  const inputWrapperClasses = computed(() => ({
    [inputNs.e('wrapper')]: true,
    [inputNs.em('wrapper', 'error')]: isValidatorError.value,
    [inputNs.em('wrapper', 'feedback')]: Boolean(formItemContext?.validateState) && formItemContext?.showFeedback,
    [ns.m('disabled')]: isDisabled.value,
  }));

  const inputInnerClasses = computed(() => [
    {
      [formControlNs.b()]: true,
      [dropdownNs.b()]: true,
      [dropdownOpenNs.b()]: isFocus.value,
      ['disabled']: isDisabled.value,
    },
  ]);

  watch(
    () => props.modelValue,
    () => {
      formItemContext?.validate('change').catch((err) => console.log(err));
    }
  );

  return { autoCompleteTopClasses, inputClasses, inputWrapperClasses, inputInnerClasses };
}

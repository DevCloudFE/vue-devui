import { computed, toRefs, ref } from 'vue';
import type { SetupContext, Ref } from 'vue';
import { AutoCompleteProps, UseAutoCompleteRender } from '../auto-complete-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export function useAutoCompleteRender(
  props: AutoCompleteProps,
  ctx: SetupContext,
  visible: Ref<boolean>,
  isFocus: Ref<boolean>
): UseAutoCompleteRender {
  const ns = useNamespace('auto-complete');
  const inputNs = useNamespace('auto-complete-input');
  const slotNs = useNamespace('auto-complete-slot');
  const formNs = useNamespace('form-group');
  const feedbackNs = useNamespace('has-feedback');
  const selectNs = useNamespace('select-open');
  const formControlNs = useNamespace('form-control');
  const dropdownNs = useNamespace('dropdown-origin');
  const dropdownOpenNs = useNamespace('dropdown-origin-open');
  const { disabled } = toRefs(props);
  const slots = ctx.slots;

  const autoCompleteTopClasses = computed(() => ({
    [ns.b()]: true,
    [ns.m(props.size)]: true,
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
    [ns.m('disabled')]: disabled.value,
  }));

  const inputInnerClasses = computed(() => [
    {
      [formControlNs.b()]: true,
      [dropdownNs.b()]: true,
      [dropdownOpenNs.b()]: isFocus.value,
      ['disabled']: disabled.value,
    },
  ]);

  return { autoCompleteTopClasses, inputClasses, inputWrapperClasses, inputInnerClasses };
}

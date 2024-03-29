import { computed, ComputedRef } from 'vue';
import { EditableSelectProps } from '../editable-select-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { States } from './use-select';

interface UseInputRenderReturnType {
  inputClasses: ComputedRef<Record<string, boolean>>;
  inputPlaceholderClasses: ComputedRef<Record<string, boolean>>;
  inputWrapperClasses: ComputedRef<Record<string, boolean>>;
  inputInnerClasses: ComputedRef<Record<string, boolean>>;
  inputSuffixClasses: ComputedRef<Record<string, boolean>>;
}

export function useInputRender(props: EditableSelectProps, states: States): UseInputRenderReturnType {
  // ref
  const ns = useNamespace('editable-select-input');
  const inputClasses = computed(() => ({
    [ns.b()]: true,
    [ns.m('sm')]: props.size === 'sm',
    [ns.m('lg')]: props.size === 'lg',
    [ns.m('open')]: states.visible,
  }));

  const inputWrapperClasses = computed(() => ({
    [ns.e('wrapper')]: true,
    [ns.em('wrapper', 'focus')]: states.isFocus,
    [ns.em('wrapper', 'disabled')]: props.disabled,
    [ns.em('wrapper', 'glow-style')]: props.showGlowStyle,
  }));

  const inputInnerClasses = computed(() => ({
    [ns.e('inner')]: true,
  }));

  const inputPlaceholderClasses = computed(() => ({
    [ns.e('placeholder')]: true,
  }));

  const inputSuffixClasses = computed(() => ({
    [ns.e('suffix')]: true,
  }));

  return {
    inputClasses,
    inputWrapperClasses,
    inputInnerClasses,
    inputPlaceholderClasses,
    inputSuffixClasses,
  };
}

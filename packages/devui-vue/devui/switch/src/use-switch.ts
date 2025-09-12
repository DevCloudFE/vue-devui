import { computed, inject, SetupContext, watch } from 'vue';
import { FORM_TOKEN } from '../../form';
import { SwitchProps, UseSwitchFn } from './switch-types';

export function useSwitch(props: SwitchProps, ctx: SetupContext): UseSwitchFn {
  const formContext = inject(FORM_TOKEN, undefined);
  const switchDisabled = computed(() => formContext?.disabled || props.disabled);

  const switchSize = computed(() => props.size || formContext?.size || 'md');

  const canChange = () => {
    if (switchDisabled.value) {
      return Promise.resolve(false);
    }
    if (props.beforeChange) {
      const res = props.beforeChange(!props.modelValue);
      return typeof res === 'boolean' ? Promise.resolve(res) : res;
    }

    return Promise.resolve(true);
  };
  const checked = computed(() => {
    return props.modelValue === props.activeValue;
  });
  watch(checked, () => {
    if (![props.activeValue, props.inactiveValue].includes(props.modelValue)) {
      ctx.emit('update:modelValue', props.inactiveValue);
    }
  });
  const toggle = () => {
    canChange().then((res) => {
      if (!res) {
        return;
      }
      const val = !checked.value ? props.activeValue : props.inactiveValue;
      ctx.emit('update:modelValue', val);
      ctx.emit('change', val);
    });
  };
  return { toggle, checked, switchDisabled, switchSize };
}

import { computed, SetupContext } from 'vue';
import { SwitchProps, UseSwitchFn } from './switch-types';

export function useSwitch(props: SwitchProps, ctx: SetupContext): UseSwitchFn {
  const canChange = () => {
    if (props.disabled) {
      return Promise.resolve(false);
    }
    if (props.beforeChange) {
      const res = props.beforeChange(!props.modelValue);
      return typeof res === 'boolean' ? Promise.resolve(res) : res;
    }

    return Promise.resolve(true);
  };
  const toggle = () => {
    canChange().then((res) => {
      if (!res) {
        return;
      }
      ctx.emit('update:modelValue', !props.modelValue);
      ctx.emit('change', !props.modelValue);
    });
  };
  const checked = computed(() => {
    return props.modelValue;
  });
  return {
    toggle,
    checked,
  };
}

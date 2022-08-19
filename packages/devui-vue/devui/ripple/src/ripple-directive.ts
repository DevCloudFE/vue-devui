// can export function.  解构参数类型冗余 新定义insterface IRippleDirectiveOptionWithBinding
import {
  DEFAULT_PLUGIN_OPTIONS,
  IRippleDirectiveOptions,
  IRippleDirectiveOptionWithBinding
} from './options';
import { ripple } from './v-ripple';
const optionMap = new WeakMap<HTMLElement, Partial<IRippleDirectiveOptions> | false>();
const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS };
export default {
  mounted(el: HTMLElement, binding: IRippleDirectiveOptionWithBinding): void {
    optionMap.set(el, binding.value ?? {});

    el.addEventListener('pointerdown', (event) => {
      const options = optionMap.get(el);
      // You must make sure that the disabled attribute exists or the instruction terminates with an error
      if (binding.value && binding.value.disabled) {return;}

      if (options === false) {return;}

      ripple(event, el, {
        ...globalOptions,
        ...options
      });
    });
  },
  updated(el: HTMLElement, binding: IRippleDirectiveOptionWithBinding): void {
    optionMap.set(el, binding.value ?? {});
  }
};

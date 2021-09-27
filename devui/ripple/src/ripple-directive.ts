// can export function.  解构参数类型冗余 新定义insterface IRippleDirectiveOptionWithBinding
import {
  DEFAULT_PLUGIN_OPTIONS,
  IVRippleDirectiveOptions,
  IRippleDirectiveOptionWithBinding
} from './options'
import { ripple } from './v-ripple'
const optionMap = new WeakMap<
  HTMLElement,
  Partial<IVRippleDirectiveOptions> | false
>()
const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS }
export default {
  mounted(el: HTMLElement, binding: IRippleDirectiveOptionWithBinding) {
    optionMap.set(el, binding.value ?? {})

    el.addEventListener('pointerdown', (event) => {
      const options = optionMap.get(el)

      if (options === false) return

      ripple(event, el, {
        ...globalOptions,
        ...options
      })
    })
  },
  updated(el: HTMLElement, binding: IRippleDirectiveOptionWithBinding) {
    optionMap.set(el, binding.value ?? {})
  }
}

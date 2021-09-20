// can export function.
import {
  DEFAULT_PLUGIN_OPTIONS,
  IVWaveDirectiveOptions
} from './options'
import { wave } from './v-wave'
const optionMap = new WeakMap<
  HTMLElement,
  Partial<IVWaveDirectiveOptions> | false
>()
const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS }
export default {
  mounted(el: HTMLElement, { value }: any) {
    optionMap.set(el, value ?? {})

    el.addEventListener('pointerdown', (event) => {
      const options = optionMap.get(el)!

      if (options === false) return

      wave(event, el, {
        ...globalOptions,
        ...options
      })
    })
  },
  updated(el: HTMLElement, { value }: any) {
    optionMap.set(el, value ?? {})
  }
}

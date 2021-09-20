import {
  DEFAULT_PLUGIN_OPTIONS,
  IVWaveDirectiveOptions,
  IVWavePluginOptions
} from './options'
import { getHooks } from './utils/hookkeys'
import { wave } from './v-wave'
import { App, Plugin } from 'vue'

const optionMap = new WeakMap<
  HTMLElement,
  Partial<IVWaveDirectiveOptions> | false
>()

const VWave = {
  install(app: App, globalUserOptions: Partial<IVWavePluginOptions> = {}) {

    if (this.installed) return
    this.installed = true

    const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS, ...globalUserOptions }
    const hooks = getHooks(app)
    app.directive(globalOptions.directive, {
      [hooks.mounted](el: HTMLElement, { value }: any) {
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
      [hooks.updated](el: HTMLElement, { value }: any) {
        optionMap.set(el, value ?? {})
      }
    })
  }
} as Plugin & { installed: boolean; }

export default VWave

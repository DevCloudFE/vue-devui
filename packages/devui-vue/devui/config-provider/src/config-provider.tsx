import { defineComponent, provide, readonly } from 'vue'
import {
  configProviderProps,
  ConfigProviderProps,
  ConfigProviderKey
} from './config-provider-types'

export default defineComponent({
  name: 'DConfigProvider',
  props: configProviderProps,
  setup(props: ConfigProviderProps, { slots }) {
    provide(ConfigProviderKey, readonly(props))
    return () => {
      return slots.default?.()
    }
  }
})

import type { PropType, ExtractPropTypes, InjectionKey } from 'vue'

export type IGlobalSize = 'lg' | 'md' | 'sm' | 'xs'

export const configProviderProps = {
  size: {
    type: String as PropType<IGlobalSize>,
    default: 'md'
  }
} as const

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
export type GlobalConfig = ConfigProviderProps

export const ConfigProviderKey: InjectionKey<GlobalConfig> = Symbol('dConfigProvider')

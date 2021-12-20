import { inject } from 'vue'
import { ConfigProviderKey, GlobalConfig } from '../config-provider-types'

const useGlobalConfig = (): GlobalConfig => inject(ConfigProviderKey, {} as GlobalConfig)

export default useGlobalConfig

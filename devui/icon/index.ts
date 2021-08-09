import { App } from 'vue'
import Icon from './src/icon'

Icon.install = function(Vue: App) {
  Vue.component(Icon.name, Icon)
};

Icon.version = '0.0.1'

export default Icon

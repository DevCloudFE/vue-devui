import { App } from 'vue'
import Switch from './src/switch'

Switch.install = function(Vue: App) {
  Vue.component(Switch.name, Switch)
};

Switch.version = '0.0.1'

export default Switch

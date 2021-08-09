import { App } from 'vue'
import Checkbox from './src/checkbox'

Checkbox.install = function(Vue: App) {
  Vue.component(Checkbox.name, Checkbox)
};

Checkbox.version = '0.0.1'

export default Checkbox

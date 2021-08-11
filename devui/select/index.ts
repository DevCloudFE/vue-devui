import { App } from 'vue'
import Select from './src/select'

Select.install = function(Vue: App) {
  Vue.component(Select.name, Select)
};

Select.version = '0.0.1'

export default Select

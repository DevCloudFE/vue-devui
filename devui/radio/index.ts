import { App } from 'vue'
import Radio from './src/radio'

Radio.install = function(Vue: App) {
  Vue.component(Radio.name, Radio)
};

Radio.version = '0.0.1'

export default Radio

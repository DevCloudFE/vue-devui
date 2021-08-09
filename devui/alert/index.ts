import { App } from 'vue'
import Alert from './alert'

Alert.install = function(Vue: App) {
  Vue.component(Alert.name, Alert)
};

Alert.version = '0.0.1'

export default Alert

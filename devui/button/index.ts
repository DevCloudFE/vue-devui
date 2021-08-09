import { App } from 'vue'
import Button from './button'

Button.install = function(Vue: App) {
  Vue.component(Button.name, Button)
};

Button.version = '0.0.1'

export default Button

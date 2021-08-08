import { App } from 'vue'
import Panel from './panel'

Panel.install = function(Vue: App) {
  Vue.component(Panel.name, Panel)
};

Panel.version = '0.0.1'

export default Panel

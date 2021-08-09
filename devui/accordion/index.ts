import { App } from 'vue'
import Accordion from './accordion'

Accordion.install = function(Vue: App) {
  Vue.component(Accordion.name, Accordion)
};

Accordion.version = '0.0.1'

export default Accordion

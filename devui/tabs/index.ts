import { App } from 'vue'
import Tabs from './tabs'

Tabs.install = function(Vue: App) {
  Vue.component(Tabs.name, Tabs)
};

Tabs.version = '0.0.1'

export default Tabs

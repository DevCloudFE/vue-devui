import { App } from 'vue'
import Anchor from './anchor'

Anchor.install = function(Vue: App) {
  Vue.component(Anchor.name, Anchor)
};

Anchor.version = '0.0.1'

export default Anchor

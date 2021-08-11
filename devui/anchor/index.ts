import { App } from 'vue'
import Anchor from './anchor'
import dAnchorBox from './d-anchor-box'
import dAnchorLink from './d-anchor-link'
import dAnchor from './d-anchor'
const directives = {
  'd-anchor-box': dAnchorBox,
  'd-anchor-link': dAnchorLink,
  'd-anchor': dAnchor 
};
Anchor.install = function(Vue: App) {
  for (const key in directives) {
    if (directives.hasOwnProperty(key)) {

      Vue.directive(key, directives[key]);
    }
  }
  console.log(Vue,'install')
  Vue.component(Anchor.name, Anchor)
};

Anchor.version = '0.0.1'

export default Anchor

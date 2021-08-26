import { App } from 'vue'
import Anchor from './src/anchor'
import dAnchorBox from './src/d-anchor-box'
import dAnchorLink from './src/d-anchor-link'
import dAnchor from './src/d-anchor'
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
 

 
export { Anchor }

export default {
  title: 'Anchor 锚点',
  category: '导航',
  install(app: App): void {
    app.use(Anchor as any)
  }
}

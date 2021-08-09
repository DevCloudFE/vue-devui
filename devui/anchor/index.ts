import { App } from 'vue'
import Anchor from './anchor'
 
const directives = {
  'only': {
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el) {
      // 聚焦元素
      el.focus();
      el.value = 5;
    }
  },
  'only2': {
    // 当被绑定的元素挂载到 DOM 中时……
    mounted(el) {
      // 聚焦元素
      el.focus();
      el.value = 6;
    }
  }
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

import DevUI from '../../../devui/vue-devui'
import Locale from '../../../devui/locale'
import Theme from '../devui-theme'
import 'vitepress-theme-demoblock/theme/styles/index.css'
import { registerComponents } from './register-components.js'
import { insertBaiduScript } from './insert-baidu-script'
import Api from '../config/components/vp-api.vue'
import Demo from '../config/components/vp-demo.vue'
import '../styles/index.scss'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(Locale).use(DevUI)
    app.component('Api', Api)
    app.component('Demo', Demo)
    // registerComponents(app)
    insertBaiduScript()
  }
}

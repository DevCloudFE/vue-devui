import DevUI from '../../../devui/vue-devui'
import Locale from '../../../devui/locale'
import Theme from '../devui-theme'
import 'vitepress-theme-demoblock/theme/styles/index.css'
import { registerComponents } from './register-components.js'
import { insertBaiduScript } from './insert-baidu-script'
import ComponentApi from '../../components/api'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component(ComponentApi.name, ComponentApi)
    app.use(Locale).use(DevUI)
    registerComponents(app)
    insertBaiduScript()
  }
}
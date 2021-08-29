import DevUI from '../../../devui/vue-devui'
import Theme from '../devui-theme'
import 'vitepress-theme-demoblock/theme/styles/index.css'
import { registerComponents } from './register-components.js'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(DevUI)
    registerComponents(app)
  }
}
import DevUI from '../../../devui/vue-devui'
import Theme from '../devui-theme'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(DevUI)
  }
}
import DevUI from '../../../devui/vue-devui'
import Theme from 'vitepress/dist/client/theme-default'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(DevUI)
  }
}
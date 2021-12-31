import type { App } from 'vue'
import AutoComplete from './src/auto-complete'

AutoComplete.install = function(app: App): void {
  app.component(AutoComplete.name, AutoComplete)
}

export { AutoComplete }

export default {
  title: 'AutoComplete 自动补全',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
        app.use(AutoComplete as any)
  }
}

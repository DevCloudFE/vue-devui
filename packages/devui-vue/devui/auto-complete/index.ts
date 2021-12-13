import type { App } from 'vue'
import AutoComplete from './src/auto-complete'

AutoComplete.install = function(app: App): void {
  app.component(AutoComplete.name, AutoComplete)
}

export { AutoComplete }

export default {
  title: 'AutoComplete 自动补全',
  category: '数据录入',
  status: undefined, // TODO: 组件若开发完成则填入"100%"，并删除该注释
  install(app: App): void {
        app.use(AutoComplete as any)
  }
}

import type { App } from 'vue'
import ConfigProvider from './src/config-provider'

ConfigProvider.install = function (app: App): void {
  app.component(ConfigProvider.name, ConfigProvider)
}

export { ConfigProvider }

export default {
  title: 'ConfigProvider 全局化配置',
  category: '通用',
  status: '3%', // TODO: 组件若开发完成则填入"100%"，并删除该注释
  install(app: App): void {
    app.use(ConfigProvider as any)
  }
}

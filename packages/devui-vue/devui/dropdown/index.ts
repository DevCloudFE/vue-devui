import type { App } from 'vue'

import Dropdown from './src/dropdown'

Dropdown.install = function (app: App): void {
  app.component(Dropdown.name, Dropdown)
}

export { Dropdown }

export default {
  title: 'Dropdown 下拉菜单',
  category: '导航',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    app.use(Dropdown as any)
  }
}

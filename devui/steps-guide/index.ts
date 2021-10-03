import type { App } from 'vue'
import StepsGuide from './src/steps-guide'

StepsGuide.install = function(app: App): void {
  app.component(StepsGuide.name, StepsGuide)
}

export { StepsGuide }

export default {
  title: 'StepsGuide 操作指引',
  category: '导航',
  status: '开发中', // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    
    app.use(StepsGuide as any)
  }
}

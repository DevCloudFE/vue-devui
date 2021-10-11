import type { App } from 'vue'
import Progress from './src/progress'

Progress.install = function(app: App) {
  app.component(Progress.name, Progress)
}

export { Progress }

export default {
  title: 'Progress 进度条',
  category: '反馈',
  status: '已完成',
  install(app: App): void {
    app.use(Progress as any)
  }
}

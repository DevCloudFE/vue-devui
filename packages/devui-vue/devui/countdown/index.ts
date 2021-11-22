import type { App } from 'vue'
import Countdown from './src/countdown'

Countdown.install = function(app: App): void {
  app.component(Countdown.name, Countdown)
}

export { Countdown }

export default {
  title: 'Countdown 倒计时',
  category: '数据展示',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
        app.use(Countdown as any)
  }
}
 
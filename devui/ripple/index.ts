import type { App } from 'vue'
import RippleDirective from './src/ripple-directive'

export { RippleDirective }

export default {
  title: 'Ripple 水波纹',
  category: '通用',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    
    app.directive('Ripple', RippleDirective)
  }
}

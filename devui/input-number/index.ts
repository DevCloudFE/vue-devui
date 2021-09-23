import type { App } from 'vue'
import InputNumber from './src/input-number'
import InputNumberDirective from './src/input-number-directive'

InputNumber.install = function(app: App) {
  app.component(InputNumber.name, InputNumber)
}
export { InputNumber, InputNumberDirective }

export default {
  title: 'InputNumber 数字输入框',
  category: '导航',
  install(app: App):void {    
		app.use(InputNumber as any)
		app.directive('InputNumber', InputNumberDirective)
  }
}

import { App } from 'vue'
import DatePicker from './datepicker'

DatePicker.install = function(Vue: App) {
  Vue.component(DatePicker.name, DatePicker)
};

DatePicker.version = '0.0.1'

export default DatePicker

import { App } from 'vue'
import DatePicker from './datepicker'
import DatePickerDemo1 from './doc-demo/demo1'

export { DatePicker, DatePickerDemo1 }

export default {
  install(app: App) {
    DatePicker.version = '0.0.1'
    app.component(DatePicker.name, DatePicker)
    app.component(DatePickerDemo1.name, DatePickerDemo1)
  }
}

import { App } from 'vue'
import DatePicker from './datepicker'

export { DatePicker }

export default {
  install(app: App) {
    DatePicker.version = '0.0.1'
    app.component(DatePicker.name, DatePicker)
  }
}

import { App } from 'vue'
import DatePicker from './datepicker'
import StickSlider from './stick-slider'

export { DatePicker, StickSlider }

export default {
  install(app: App) {
    DatePicker.version = '0.0.1'
    app.component(DatePicker.name, DatePicker)
    app.component(StickSlider.name, StickSlider)
  }
}

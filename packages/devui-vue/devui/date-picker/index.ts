import { App } from 'vue';
import DatePicker from './src/date-picker';
import StickSlider from './src/stick-slider';

DatePicker.install = function(app: App) {
  app.component(DatePicker.name, DatePicker);
  app.component(StickSlider.name, StickSlider);
};

export { DatePicker, StickSlider };

export default {
  title: 'DatePicker 日期选择器',
  category: '数据录入',
  status: '50%',
  install(app: App): void {
    app.use(DatePicker as any);
  }
};

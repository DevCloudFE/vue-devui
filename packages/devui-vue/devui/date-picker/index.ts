import { App } from 'vue';
import DatePicker from './src/date-picker';
import StickSlider from './src/stick-slider';

export { DatePicker, StickSlider };

export default {
  title: 'DatePicker 日期选择器',
  category: '数据录入',
  status: '50%',
  deprecated: {
    value: true,
    reason: '推荐使用 DatePickerPro 组件替代。'
  },
  install(app: App): void {
    app.component(DatePicker.name, DatePicker);
    app.component(StickSlider.name, StickSlider);
  }
};

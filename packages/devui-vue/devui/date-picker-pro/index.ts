import type { App } from 'vue';
import DatepickerPro from './src/date-picker-pro';

export * from './src/date-picker-pro-types';

export { DatepickerPro };

export default {
  title: 'DatePickerPro 日期选择器',
  category: '数据录入',
  status: '5%',
  install(app: App): void {
    app.component(DatepickerPro.name, DatepickerPro);
  },
};

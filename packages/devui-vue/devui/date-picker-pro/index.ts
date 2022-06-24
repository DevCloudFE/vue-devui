import type { App } from 'vue';
import DatePickerPro from './src/date-picker-pro';
import DRangeDatePickerPro from './src/components/range-date-picker-pro';

export * from './src/date-picker-pro-types';

export { DatePickerPro, DRangeDatePickerPro };

export default {
  title: 'DatePickerPro 日期选择器',
  category: '数据录入',
  status: '50%',
  install(app: App): void {
    app.component(DatePickerPro.name, DatePickerPro);
    app.component(DRangeDatePickerPro.name, DRangeDatePickerPro);
  },
};

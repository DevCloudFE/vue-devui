import type { App } from 'vue';
import TimePicker from './src/time-picker';

export { TimePicker };

export default {
  title: 'TimePicker 时间选择器',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component(TimePicker.name, TimePicker);
  }
};

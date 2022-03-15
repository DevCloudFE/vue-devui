import type { App } from 'vue';
import TimePicker from './src/time-picker';

TimePicker.install = function(app: App): void {
  app.component(TimePicker.name, TimePicker);
};

export { TimePicker };

export default {
  title: 'TimePicker 时间选择器',
  category: '数据录入',
  status: '90%', // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    app.use(TimePicker as any);
  }
};

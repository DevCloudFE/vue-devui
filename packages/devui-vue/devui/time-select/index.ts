import type { App } from 'vue';
import TimeSelect from './src/time-select';

export { TimeSelect };

export default {
  title: 'TimeSelect 时间选择器',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component(TimeSelect.name, TimeSelect);
  },
};

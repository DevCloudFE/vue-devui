import type { App } from 'vue';
import AutoComplete from './src/auto-complete';

export * from './src/auto-complete-types';

export { AutoComplete };

export default {
  title: 'AutoComplete 自动补全',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component(AutoComplete.name, AutoComplete);
  }
};

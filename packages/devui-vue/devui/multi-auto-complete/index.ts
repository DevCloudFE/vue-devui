import type { App } from 'vue';
import MultiAutoComplete from './src/multi-auto-complete';

export * from './src/multi-auto-complete-types';

export { MultiAutoComplete };

export default {
  title: 'MultiAutoComplete 多项自动补全',
  category: '数据录入',
  status: '1%', // TODO 组件完成状态，开发完组件新特性请及时更新该状态值；若组件开发完成则填入'100%'，并删除该注释
  install(app: App): void {
    app.component(MultiAutoComplete.name, MultiAutoComplete);
  }
};

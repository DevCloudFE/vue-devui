import type { App } from 'vue';
import Status from './src/status';

export * from './src/status-types';

export { Status };

export default {
  title: 'Status 状态',
  category: '通用',
  status: '100%',
  deprecated: {
    value: true,
    reason: 'Status 是无内容包裹状态下的 Badge 组件，应该使用 Badge 替代。'
  },
  install(app: App): void {
    app.component(Status.name, Status);
  }
};

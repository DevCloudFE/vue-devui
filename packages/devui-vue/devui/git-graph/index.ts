import type { App } from 'vue';

export * from './src/grid-types';

export { Row, Col };

export default {
  title: 'GitGraph 提交网络图',
  category: '布局',
  status: '100%',
  install(app: App): void {
    app.component(Row.name, Row);
  }
};

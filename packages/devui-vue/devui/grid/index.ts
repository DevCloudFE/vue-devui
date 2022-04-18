import type { App } from 'vue';
import Row from './src/row';
import Col from './src/col';

export * from './src/grid-types';

export { Row, Col };

export default {
  title: 'Grid 栅格',
  category: '布局',
  status: '100%',
  install(app: App): void {
    app.component(Row.name, Row);
    app.component(Col.name, Col);
  }
};

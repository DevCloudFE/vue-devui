import type { App } from 'vue';
import Row from './src/row';
import Col from './src/col';

Row.install = function(app: App): void {
  app.component(Row.name, Row);
};

Col.install = function(app: App): void {
  app.component(Col.name, Col);
};
export { Row, Col };

export default {
  title: 'Grid 栅格',
  category: '布局',
  status: '100%',
  install(app: App): void {
    app.use(Col as any);
    app.use(Row as any);
  }
};

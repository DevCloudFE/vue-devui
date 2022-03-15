import type { App } from 'vue';
import QuadrantDiagram from './src/quadrant-diagram';

QuadrantDiagram.install = function (app: App) {
  app.component(QuadrantDiagram.name, QuadrantDiagram);
};

export { QuadrantDiagram };

export default {
  title: 'QuadrantDiagram 象限图',
  category: '数据展示',
  status: '10%',
  install(app: App): void {
    app.use(QuadrantDiagram as any);
  }
};

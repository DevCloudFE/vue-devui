import type { App } from 'vue';
import Gantt from './src/gantt';
import GanttTools from './src/gantt-tools';
import ganttMarkerDirective from './src/gantt-scale/gantt-marker-directive';

Gantt.install = function (app: App): void {
  app.component(Gantt.name, Gantt);
  app.component(GanttTools.name, GanttTools);
  app.directive('gantt-marker', ganttMarkerDirective);
};

export { Gantt };

export default {
  title: 'Gantt 甘特图',
  category: '数据展示',
  status: '10%', // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    app.use(Gantt as any);
  },
};

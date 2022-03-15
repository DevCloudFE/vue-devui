import type { App } from 'vue';
import Timeline from './src/timeline';
import TimelineItem from './src/components/timeline-item';

Timeline.install = function (app: App): void {
  app.component(Timeline.name, Timeline);
};
TimelineItem.install = function (app: App): void {
  app.component(TimelineItem.name, TimelineItem);
};
export { Timeline, TimelineItem };

export default {
  title: 'Timeline 时间轴',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.use(Timeline as any);
    app.use(TimelineItem as any);
  }
};

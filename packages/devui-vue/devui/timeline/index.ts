import type { App } from 'vue';
import Timeline from './src/timeline';
import TimelineItem from './src/components/timeline-item';

export * from './src/timeline-types';

export { Timeline, TimelineItem };

export default {
  title: 'Timeline 时间轴',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Timeline.name, Timeline);
    app.component(TimelineItem.name, TimelineItem);
  }
};

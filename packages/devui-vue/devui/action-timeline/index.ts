import type { App } from 'vue';
import ActionTimeline from './src/action-timeline';
export * from './src/action-timeline-types';

export { ActionTimeline };

export default {
  title: 'ActionTimeline 操作时间轴',
  category: '演进中',
  status: '100%',
  install(app: App): void {
    app.component(ActionTimeline.name, ActionTimeline);
  },
};

import type { App } from 'vue';
import Mention from './src/mention';

export * from './src/mention-types';

export { Mention };

export default {
  title: 'Mention 提及',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component(Mention.name, Mention);
  },
};

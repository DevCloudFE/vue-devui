import type { App } from 'vue';
import Badge from './src/badge';
export * from './src/badge-types';

export { Badge };

export default {
  title: 'Badge 徽标',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Badge.name, Badge);
  },
};

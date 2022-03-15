import type { App } from 'vue';
import Icon from './src/icon';

Icon.install = function(app: App) {
  app.component(Icon.name, Icon);
};

export { Icon };

export default {
  title: 'Icon 图标',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.use(Icon as any);
  }
};

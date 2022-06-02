import type { App } from 'vue';
import Icon from './src/icon';
import IconGroup from './src/icon-group';

export * from './src/icon-types';

export { Icon, IconGroup };

export default {
  title: 'Icon 图标',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.component(Icon.name, Icon);
    app.component(IconGroup.name, IconGroup);
  },
};

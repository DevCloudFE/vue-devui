import type { App } from 'vue';
import Avatar from './src/avatar';

export * from './src/avatar-types';

export { Avatar };

export default {
  title: 'Avatar 头像',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Avatar.name, Avatar);
  },
};

import { App } from 'vue';
import NavSprite from './src/nav-sprite';

export { NavSprite };

export default {
  title: 'NavSprite 导航精灵',
  category: '导航',
  status: '10%',
  install(app: App): void {
    app.component(NavSprite.name, NavSprite);
  }
};

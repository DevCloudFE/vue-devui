import { App } from 'vue';
import NavSprite from './src/nav-sprite';

NavSprite.install = function (app: App) {
  app.component(NavSprite.name, NavSprite);
};

export { NavSprite };

export default {
  title: 'NavSprite 导航精灵',
  category: '导航',
  status: '10%',
  install(app: App): void {
    app.use(NavSprite as any);
  }
};

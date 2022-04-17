import { App } from 'vue';
import Anchor from './src/anchor';
import dAnchorBox from './src/d-anchor-box';
import dAnchorLink from './src/d-anchor-link';
import dAnchor from './src/d-anchor';
import './src/anchor.scss';

Anchor.install = function(Vue: App) {
  Vue.directive(dAnchor.name, dAnchor);
  Vue.directive(dAnchorLink.name, dAnchorLink);
  Vue.directive(dAnchorBox.name, dAnchorBox);
  Vue.component(Anchor.name, Anchor);
};

export { Anchor };

export default {
  title: 'Anchor 锚点',
  category: '导航',
  status: '50%',
  install(app: App): void {
    app.use(Anchor as any);
  }
};

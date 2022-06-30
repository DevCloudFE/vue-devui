import { App } from 'vue';
import Anchor from './src/anchor';
import dAnchorBox from './src/d-anchor-box';
import dAnchorLink from './src/d-anchor-link';
import dAnchor from './src/d-anchor';
import './src/anchor.scss';

export { Anchor };

export default {
  title: 'Anchor 锚点',
  category: '导航',
  status: '50%',
  install(app: App): void {
    app.directive(dAnchor.name, dAnchor);
    app.directive(dAnchorLink.name, dAnchorLink);
    app.directive(dAnchorBox.name, dAnchorBox);
    app.component(Anchor.name, Anchor);
  }
};

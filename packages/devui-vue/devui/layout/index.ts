import type { App } from 'vue';
import Layout from './src/layout';
import Content from './src/content';
import Header from './src/header';
import Footer from './src/footer';
import Aside from './src/aside';

export { Layout, Content, Header, Footer, Aside };

export default {
  title: 'Layout 布局',
  category: '布局',
  status: '100%',
  install(app: App): void {
    app.component(Layout.name, Layout);
    app.component(Content.name, Content);
    app.component(Header.name, Header);
    app.component(Footer.name, Footer);
    app.component(Aside.name, Aside);
  }
};

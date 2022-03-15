import type { App } from 'vue';
import Layout from './src/layout';
import Content from './src/content';
import Header from './src/header';
import Footer from './src/footer';
import Aside from './src/aside';

Layout.install = function(app: App): void {
  app.component(Layout.name, Layout);
};

Content.install = function(app: App): void {
  app.component(Content.name, Content);
};

Header.install = function(app: App): void {
  app.component(Header.name, Header);
};

Footer.install = function(app: App): void {
  app.component(Footer.name, Footer);
};

Aside.install = function(app: App): void {
  app.component(Aside.name, Aside);
};

export { Layout, Content, Header, Footer, Aside };

export default {
  title: 'Layout 布局',
  category: '布局',
  status: '100%',
  install(app: App): void {
    app.use(Layout as any);
    app.use(Content as any);
    app.use(Header as any);
    app.use(Footer as any);
    app.use(Aside as any);
  }
};

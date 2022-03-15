import type { App } from 'vue';
import Panel from './src/panel';
import PanelHeader from './src/header/panel-header';
import PanelBody from './src/body/panel-body';
import PanelFooter from './src/foot/panel-footer';

Panel.install = function(app: App) {
  app.component(Panel.name, Panel);
  app.component(PanelHeader.name, PanelHeader);
  app.component(PanelBody.name, PanelBody);
  app.component(PanelFooter.name, PanelFooter);
};

export { Panel };

export default {
  title: 'Panel 面板',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.use(Panel as any);
  }
};


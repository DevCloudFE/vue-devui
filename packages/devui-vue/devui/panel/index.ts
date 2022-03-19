import type { App } from 'vue';
import Panel from './src/panel';
import PanelHeader from './src/components/panel-header';
import PanelBody from './src/components/panel-body';
import PanelFooter from './src/components/panel-footer';

export * from './src/panel-types';

export { Panel, PanelHeader, PanelBody, PanelFooter };

export default {
  title: 'Panel 面板',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.component(Panel.name, Panel);
    app.component(PanelHeader.name, PanelHeader);
    app.component(PanelBody.name, PanelBody);
    app.component(PanelFooter.name, PanelFooter);
  }
};


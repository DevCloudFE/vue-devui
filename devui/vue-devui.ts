import { App } from 'vue';

import Alert from './alert/alert';
import Button from './button/button';
import Checkbox from './checkbox/src/checkbox';
import Panel from './panel/panel';
import Radio from './radio/src/radio';
import Tabs from './tabs/tabs';
import Toggle from './toggle/src/toggle';

function install(app: App) {
  const packages = [
    Alert, Button, Checkbox, Panel, Radio, Tabs, Toggle,
  ];
  packages.forEach((item:any) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}

export {
  Alert, Button, Checkbox, Panel, Radio, Tabs, Toggle,
};

export default { install, version: '0.0.1' };

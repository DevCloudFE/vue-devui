import type { App } from 'vue';
import Button from './src/button';
import ButtonGroup from './src/button-group';

export * from './src/button-types';

export { Button, ButtonGroup };

export default {
  title: 'Button 按钮',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.component(Button.name, Button);
    app.component(ButtonGroup.name, ButtonGroup);
  },
};

import type { App } from 'vue';
import Radio from './src/radio';
import RadioGroup from './src/radio-group';

Radio.install = function(app: App) {
  app.component(Radio.name, Radio);
};

RadioGroup.install = function(app: App) {
  app.component(RadioGroup.name, RadioGroup);
};

export { Radio, RadioGroup };

export default {
  title: 'Radio 单选框',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.use(Radio as any);
    app.use(RadioGroup as any);
  }
};

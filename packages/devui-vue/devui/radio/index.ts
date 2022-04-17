import type { App } from 'vue';
import Radio from './src/radio';
import RadioGroup from './src/radio-group';

export { Radio, RadioGroup };

export default {
  title: 'Radio 单选框',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component(Radio.name, Radio);
    app.component(RadioGroup.name, RadioGroup);
  },
};

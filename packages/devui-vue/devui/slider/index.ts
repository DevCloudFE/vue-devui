import type { App } from 'vue';
import Slider from './src/slider';

Slider.install = function (app: App): void {
  app.component(Slider.name, Slider);
};

export { Slider };

export default {
  title: 'Slider 滑块',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.use(Slider as any);
  }
};

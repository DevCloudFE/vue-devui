import type { App } from 'vue';
import Slider from './src/slider';

export * from './src/slider-types';

export { Slider };

export default {
  title: 'Slider 滑块',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.component(Slider.name, Slider);
  }
};

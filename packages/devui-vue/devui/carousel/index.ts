import type { App } from 'vue';
import Carousel from './src/carousel';
import CarouselItem from './src/item';

Carousel.install = function(app: App) {
  app.component(Carousel.name, Carousel);
};

CarouselItem.install = function(app: App) {
  app.component(CarouselItem.name, CarouselItem);
};

export { Carousel };
export { CarouselItem };

export default {
  title: 'Carousel 走马灯',
  category: '数据展示',
  status: '80%',
  install(app: App): void {
    app.use(Carousel as any);
    app.use(CarouselItem as any);
  }
};

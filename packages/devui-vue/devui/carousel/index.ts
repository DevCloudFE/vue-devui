import type { App } from 'vue';
import Carousel from './src/carousel';
import CarouselItem from './src/item';

export { Carousel, CarouselItem };

export default {
  title: 'Carousel 走马灯',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Carousel.name, Carousel);
    app.component(CarouselItem.name, CarouselItem);
  },
};

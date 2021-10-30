import type { App } from 'vue'
import Carousel from './src/carousel'
import CarouseItem from './src/item'

Carousel.install = function(app: App) {
  app.component(Carousel.name, Carousel)
}

CarouseItem.install = function(app: App) {
  app.component(CarouseItem.name, CarouseItem);
}

export { Carousel }

export default {
  title: 'Carousel 走马灯',
  category: '数据展示',
  status: '80%',
  install(app: App): void {
    app.use(Carousel as any)
    app.use(CarouseItem as any)
  }
}

import type { App } from 'vue'
import Carousel from './src/carousel'

Carousel.install = function(app: App) {
  app.component(Carousel.name, Carousel)
}

export { Carousel }

export default {
  title: 'Carousel 走马灯',
  category: '数据展示',
  install(app: App): void {
    app.use(Carousel as any)
  }
}

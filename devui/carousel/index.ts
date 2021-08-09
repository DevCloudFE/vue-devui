import { App } from 'vue'
import Carousel from './carousel'

Carousel.install = function(Vue: App) {
  Vue.component(Carousel.name, Carousel)
};

Carousel.version = '0.0.1'

export default Carousel

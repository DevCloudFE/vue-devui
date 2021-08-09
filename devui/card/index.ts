import { App } from 'vue'
import Card from './card'

Card.install = function(Vue: App) {
  Vue.component(Card.name, Card)
};

Card.version = '0.0.1'

export default Card

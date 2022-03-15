import type { App } from 'vue';
import Card from './src/card';

Card.install = function(app: App) {
  app.component(Card.name, Card);
};

export { Card };

export default {
  title: 'Card 卡片',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.use(Card as any);
  }
};

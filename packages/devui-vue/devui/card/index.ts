import type { App } from 'vue';
import Card from './src/card';

export * from './src/card-types';

export { Card };

export default {
  title: 'Card 卡片',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Card.name, Card);
  }
};

import type { App } from 'vue';
import Transfer from './src/transfer';

Transfer.install = function (app: App) {
  app.component(Transfer.name, Transfer);
};

export { Transfer };

export default {
  title: 'Transfer 穿梭框',
  category: '数据录入',
  status: '40%',
  install(app: App): void {
    app.use(Transfer as any);
  }
};

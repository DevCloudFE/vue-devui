import type { App } from 'vue';
import Transfer from './src/transfer';

export { Transfer };

export default {
  title: 'Transfer 穿梭框',
  category: '数据录入',
  status: '60%',
  install(app: App): void {
    app.component(Transfer.name, Transfer);
  }
};

import type { App } from 'vue';
import Countdown from './src/countdown';

export * from './src/countdown-types';

export { Countdown };

export default {
  title: 'Countdown 倒计时',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Countdown.name, Countdown);
  }
};

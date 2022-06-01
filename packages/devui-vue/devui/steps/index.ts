import type { App } from 'vue';
import Steps from './src/steps';

export * from './src/steps-types';

export { Steps };

export default {
  title: 'Steps 步骤条',
  category: '数据展示',
  status: '1%', // TODO 组件完成状态，开发完组件新特性请及时更新该状态值；若组件开发完成则填入'100%'，并删除该注释
  install(app: App): void {
    app.component(Steps.name, Steps);
  }
};

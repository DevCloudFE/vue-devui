import type { App } from 'vue';
import Steps from './src/steps';
import Step from './src/step';

export * from './src/steps-types';
export * from './src/step-types';

export { Steps, Step };

export default {
  title: 'Steps 步骤条',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Steps.name, Steps);
    app.component(Step.name, Step);
  }
};

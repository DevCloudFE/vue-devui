import type { App } from 'vue';
import StepsGuide from './src/steps-guide';
import StepsGuideDirective from './src/steps-guide-directive';

export * from './src/steps-guide-types';

export { StepsGuide, StepsGuideDirective };

export default {
  title: 'StepsGuide 操作指引',
  category: '导航',
  status: '80%',
  install(app: App): void {
    app.component(StepsGuide.name, StepsGuide);
    app.directive('StepsGuide', StepsGuideDirective);
  }
};

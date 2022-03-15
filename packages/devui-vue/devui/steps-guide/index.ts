import type { App } from 'vue';
import StepsGuide from './src/steps-guide';

import StepsGuideDirective from './directive/steps-guide';
StepsGuide.install = function(app: App): void {
  app.component(StepsGuide.name, StepsGuide);
};

export { StepsGuide };

export default {
  title: 'StepsGuide 操作指引',
  category: '导航',
  status: '80%',
  install(app: App): void {
    app.use(StepsGuide as any);
    app.directive('StepsGuide', StepsGuideDirective);
  }
};

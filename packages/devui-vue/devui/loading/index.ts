import { App } from 'vue';
import LoadingService from './src/loading-service';
import LoadingDirective from './src/loading-directive';

export * from './src/loading-types';

export {
  LoadingService,
  LoadingDirective
};

export default {
  title: 'Loading 加载提示',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.directive('loading', LoadingDirective);
    app.config.globalProperties.$loadingService = LoadingService;
  }
};

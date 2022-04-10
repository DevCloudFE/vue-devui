import { App } from 'vue';
import Loading from './src/loading-directive';
import LoadingService from './src/loading-service';

export * from './src/loading-types';

export {
  LoadingService,
  Loading
};

export default {
  title: 'Loading 加载提示',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.directive('dLoading', Loading);
    app.config.globalProperties.$loadingService = LoadingService;
  }
};

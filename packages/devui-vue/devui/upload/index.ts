import type { App } from 'vue';
import Upload from './src/upload';
import fileDropDirective from './src/file-drop-directive';
export * from './src/upload-types';

export { Upload };

export default {
  title: 'Upload 上传',
  category: '数据录入',
  status: '100%',
  install(app: App): void {
    app.directive('file-drop', fileDropDirective);
    app.component(Upload.name, Upload);
  },
};

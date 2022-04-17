import type { App } from 'vue';
import ColorPicker from './src/color-picker';

ColorPicker.install = function (app: App): void {
  app.component(ColorPicker.name, ColorPicker);
};

export { ColorPicker };

export default {
  title: 'ColorPicker 颜色选择器',
  category: '数据录入',
  status: '80%', // TODO: 组件若开发完成则填入"100%"，并删除该注释
  install(app: App): void {
    app.use(ColorPicker as any);
  }
};

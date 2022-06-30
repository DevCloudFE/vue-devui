import type { App } from 'vue';
import BackTop from './src/back-top';

export { BackTop };

export default {
  title: 'BackTop 回到顶部',
  category: '导航',
  status: '60%', // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    app.component(BackTop.name, BackTop);
  },
};

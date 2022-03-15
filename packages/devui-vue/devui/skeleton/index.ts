import type { App } from 'vue';
import Skeleton from './src/skeleton';
import SkeletonItem from './src/item/item';

Skeleton.install = function(app: App): void {
  app.component(Skeleton.name, Skeleton);
  app.component(SkeletonItem.name, SkeletonItem);
};

export { Skeleton,SkeletonItem };

export default {
  title: 'Skeleton 骨架屏',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.use(Skeleton as any);
  }
};

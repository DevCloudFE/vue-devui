import type { App } from 'vue';
import Skeleton from './src/skeleton';
import SkeletonItem from './src/components/skeleton-item';

export * from './src/skeleton-types';

export { Skeleton, SkeletonItem };

export default {
  title: 'Skeleton 骨架屏',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Skeleton.name, Skeleton);
    app.component(SkeletonItem.name, SkeletonItem);
  },
};

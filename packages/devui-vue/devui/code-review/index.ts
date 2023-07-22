import type { App } from 'vue';
import CodeReview from './src/code-review';
export * from './src/code-review-types';

export { CodeReview };

export default {
  title: 'CodeReview 代码检视',
  category: '演进中',
  status: '100%',
  install(app: App): void {
    app.component(CodeReview.name, CodeReview);
  },
};

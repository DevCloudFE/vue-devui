import type { App } from 'vue';
import Comment from './src/comment';

export * from './src/comment-types';

export { Comment };

export default {
  title: 'Comment 评论',
  category: '数据展示',
  status: '100%',
  install(app: App): void {
    app.component(Comment.name, Comment);
  }
};

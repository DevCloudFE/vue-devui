import type { App } from 'vue'
import Comment from './src/comment'

Comment.install = function(app: App): void {
  app.component(Comment.name, Comment)
}

export { Comment }

export default {
  title: 'Comment 评论',
  category: '数据展示',
  status: '70%', // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    app.use(Comment as any)
  }
}

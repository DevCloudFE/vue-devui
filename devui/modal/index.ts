import type { App } from 'vue'
import Modal from './src/modal'

Modal.install = function(app: App): void {
  app.component(Modal.name, Modal)
}

export { Modal }

export default {
  title: 'Modal 弹窗',
  category: '反馈',
  status: undefined, // TODO: 组件若开发完成则填入"已完成"，并删除该注释
  install(app: App): void {
    
    app.use(Modal as any)
  }
}

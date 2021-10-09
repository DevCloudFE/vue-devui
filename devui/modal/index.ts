import type { App } from 'vue'
import Modal from './src/modal'
import { ModalService } from './src/services/modal-service'
import { DialogService } from './src/services/dialog-service'
import { inBrowser } from '../shared/util/common-var'

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

    if (!inBrowser) {
      return;
    }

    let anchorsContainer = document.getElementById('d-modal-anchors-container');
    if (!anchorsContainer) {
      anchorsContainer = document.createElement('div');
      anchorsContainer.setAttribute('id', 'd-modal-anchors-container');
      document.body.appendChild(anchorsContainer);  
    }
    // 新增 modalService
    app.provide(ModalService.token, new ModalService(anchorsContainer));
    app.provide(DialogService.token, new DialogService(anchorsContainer));
  }
}

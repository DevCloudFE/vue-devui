import type { App } from 'vue';
import Modal from './src/modal';
import ModalHeader from './src/components/header';
import ModalBody from './src/components/body';
import ModalFooter from './src/components/footer';
import { ModalService } from './src/services/modal-service';
import { inBrowser } from '../shared/utils/common-var';

export * from './src/modal-types';

export { Modal, ModalHeader, ModalBody, ModalFooter };

export default {
  title: 'Modal 弹窗',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.component(Modal.name, Modal);
    app.component(ModalHeader.name, ModalHeader);
    app.component(ModalBody.name, ModalBody);
    app.component(ModalFooter.name, ModalFooter);

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
  },
};

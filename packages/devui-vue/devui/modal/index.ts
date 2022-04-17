import type { App } from 'vue';
import Modal from './src/modal';
import Header from './src/components/header';
import Body from './src/components/body';
import Footer from './src/components/footer';
import { ModalService } from './src/services/modal-service';
import { inBrowser } from '../shared/utils/common-var';

export * from './src/modal-types';

export { Modal };

export default {
  title: 'Modal 弹窗',
  category: '反馈',
  status: '100%',
  install(app: App): void {
    app.component(Modal.name, Modal);
    app.component(Header.name, Header);
    app.component(Body.name, Body);
    app.component(Footer.name, Footer);

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

import type { InjectionKey, Slot } from 'vue';
import { ModalProps } from '../modal-types';
import { CommonModalService, ModalOpenResult } from './common-modal-service';
import DModal from '../modal';

let vm;

export interface ModalOptions {
  title?: string;
  lockScroll?: boolean;
  closeOnClickOverlay?: boolean;
  header: Slot;
  content: Slot;
  footer: Slot;
  beforeClose: (done: () => void) => void;
}

export class ModalService extends CommonModalService<ModalOptions, ModalProps> {
  static token = 'MODAL_SERVICE_TOKEN' as unknown as InjectionKey<ModalService>;

  component(): unknown {
    return DModal;
  }

  open(props: Partial<ModalOptions> = {}): ModalOpenResult {
    // TODO：手动的方式可能抛弃了 content 内部的响应式，这里需要再优化。
    const anchor = document.createElement('div');
    this.anchorContainer.appendChild(anchor);

    const { header, content, footer, ...resProps } = props;

    const needHideOrNot = (value: boolean) => {
      if (!value) {
        hide();
      }
    };
    const renderOrigin = (props: typeof resProps, onUpdateModelValue = needHideOrNot) => {
      return this.renderModal(
        anchor,
        {
          ...props,
          modelValue: true,
          'onUpdate:modelValue': onUpdateModelValue,
        },
        { header, default: content, footer }
      );
    };

    // 隐藏按钮
    const hide = () => {
      renderOrigin(resProps, (value: boolean) => {
        if (!value) {
          this.renderModal(anchor, { ...resProps, modelValue: false });
          this.renderNull(anchor);
        } else {
          renderOrigin(resProps);
        }
      });
      vm.component.exposed.handleVisibleChange?.(false);
    };

    // 先渲染一次，触发动画用
    this.renderModal(anchor, { modelValue: false });

    // 再渲染详细内容
    vm = renderOrigin(resProps);

    return { hide };
  }
}

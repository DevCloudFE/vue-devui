import type { InjectionKey, Slot, VNode } from 'vue';
import { ModalProps } from '../modal-types';
import { CommonModalService, ModalOpenResult } from './common-modal-service';
import DModal from '../modal';

let vm: VNode | null;
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

    const renderOrigin = (propsValue: typeof resProps, onUpdateModelValue: (value: boolean) => void): VNode => {
      return this.renderModal(
        anchor,
        {
          ...propsValue,
          modelValue: true,
          'onUpdate:modelValue': onUpdateModelValue,
        },
        { header, default: content, footer }
      );
    };

    // 隐藏按钮
    const hide = () => {
      const innerNeedHideOrNot = (value: boolean) => {
        if (!value) {
          hide();
        }
      };
      renderOrigin(resProps, (value: boolean) => {
        if (!value) {
          this.renderModal(anchor, { ...resProps, modelValue: false });
          this.renderNull(anchor);
        } else {
          renderOrigin(resProps, innerNeedHideOrNot);
        }
      });
      vm?.component?.exposed?.handleVisibleChange?.(false);
    };

    const needHideOrNot = (value: boolean) => {
      if (!value) {
        hide();
      }
    };

    // 先渲染一次，触发动画用
    this.renderModal(anchor, { modelValue: false });

    // 再渲染详细内容
    vm = renderOrigin(resProps, needHideOrNot);

    return { hide };
  }
}

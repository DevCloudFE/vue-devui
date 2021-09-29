import { InjectionKey, Slot } from 'vue';
import { ModalProps } from '../modal-types';
import { CommonModalService, ModalOpenResult } from './common-modal-service';
import Modal from '../modal';

export interface ModalOptions {
  width: string
  maxHeight: string
  zIndex: number
  backdropZIndex: number
  placement: 'center' | 'top' | 'bottom'
  offsetX: string
  offsetY: string
  showAnimation: boolean
  backdropCloseable: boolean
  escapeable: boolean
  bodyScrollable: boolean
  content: Slot

  onClose(): void
  beforeHidden: (() => boolean) | Promise<boolean>
}


export class ModalService extends CommonModalService<ModalOptions, ModalProps> {

  static token = 'MODAL_SERVICE_TOKEN' as unknown as InjectionKey<ModalService>;

  component(): any {
    return Modal;
  }

  open(props: Partial<ModalOptions> = {}): ModalOpenResult {
    // TODO：手动的方式可能抛弃了 content 内部的响应式，这里需要再优化。
    const anchor = document.createElement('div');
    this.anchorContainer.appendChild(anchor);

    const {content, ...resProps} = props;

    // 隐藏按钮
    const hide = () => {
      this.renderModal(anchor, {...resProps, modelValue: false }, { default: content });
      this.renderNull(anchor);
    }

    // 先渲染一次，触发动画用
    this.renderModal(anchor, {modelValue: false});

    // 再渲染详细内容
    this.renderModal(anchor, {
      ...resProps,
      modelValue: true, 
      'onUpdate:modelValue': (value: boolean) => {
        if (!value) {
          hide();
        }
      }
    }, {default: content});
    
    return { hide }
  }
}

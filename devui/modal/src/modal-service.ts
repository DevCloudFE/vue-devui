import {h, render, InjectionKey, Slots} from 'vue';
import { ModalProps, ModalPropsType, } from './modal-types';
import Modal from './modal';

export class ModalService {

  static token = 'MODAL_SERVICE_TOKEN' as unknown as InjectionKey<ModalService>;

  constructor(public anchor: HTMLElement) {}

  open(props: Partial<ModalPropsType> = {}): ({ hide: () => void; }) {
    // TODO：手动的方式可能抛弃了 content 内部的响应式，这里需要再优化。

    const {content, ...resProps} = props;
    const hide = () => {
      this.renderModal(this.anchor, {...resProps as any, modelValue: false }, { default: content });
      this.renderNull(this.anchor);
    }
    // 先渲染一次
    this.renderModal(this.anchor, {modelValue: false});

    // 再渲染详细内容
    this.renderModal(this.anchor, {
      ...resProps as any,
      modelValue: true, 
      'onUpdate:modelValue': (value: boolean) => {
        if (!value) {
          hide();
        }
      }
    }, {default: content});
    return { hide }
  }

  private renderModal(anchor: HTMLElement, props: Partial<ModalProps>, children?: Slots) {
    setTimeout(() => {
      render(h(Modal as any, props, children), anchor);      
    }, 0);
  }
  private renderNull(anchor: HTMLElement) {
    // 动画运行完毕后
    setTimeout(() => {
      render(null, anchor);      
    }, 500);
  }
}

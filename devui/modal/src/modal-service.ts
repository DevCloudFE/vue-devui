import {h, render, InjectionKey, Slots} from 'vue';
import { ButtonOption, ModalProps, ModalPropsType } from './modal-types';
import Modal from './modal';

interface ModalOpenResult {
  hide(): void
  updateButtonOptions(buttons: ButtonOption[]): void
}

export class ModalService {

  static token = 'MODAL_SERVICE_TOKEN' as unknown as InjectionKey<ModalService>;

  constructor(public anchorContainer: HTMLElement) {}

  open(props: Partial<ModalPropsType> = {}): ModalOpenResult {
    // TODO：手动的方式可能抛弃了 content 内部的响应式，这里需要再优化。
    const anchor = document.createElement('div');
    this.anchorContainer.appendChild(anchor);

    const {content, ...resProps} = props;

    // 隐藏按钮
    const hide = () => {
      this.renderModal(anchor, {...resProps, modelValue: false }, { default: content });
      this.renderNull(anchor);
    }

    // 更新按钮选项
    const updateButtonOptions = (buttonOptions: ButtonOption[]) => {
      const { buttons, ...innerResProps } = resProps;
      const newButtonOptions = buttons.map((option, index) => ({
        ...option,
        ...buttonOptions[index]
      }));
      this.renderModal(anchor, { 
        ...innerResProps, 
        buttons: newButtonOptions 
      }, { default: content });
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
    
    return { hide, updateButtonOptions }
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

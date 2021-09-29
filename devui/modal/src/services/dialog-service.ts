import { Slot, InjectionKey } from 'vue';
import { CommonModalService, ModalOpenResult } from './common-modal-service';
import Dialog from '../dialog';
import { ButtonOptions, DialogProps } from '../dialog-types';


export interface DialogOptions {
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
  dialogtype: 'standard' | 'success' | 'failed' | 'warning'| 'info'

  title: string
  content: Slot
  buttons: ButtonOptions[]

  onClose(): void
  beforeHidden: (() => boolean) | Promise<boolean>
  
}

export class DialogService extends CommonModalService<DialogOptions, DialogProps> {

  static token = 'DIALOG_SERVICE_TOKEN' as unknown as InjectionKey<DialogService>;

  component(): any {
    return Dialog;
  }
  
  open(props: Partial<DialogOptions> = {}): ModalOpenResult & {updateButtonOptions(options: ButtonOptions[]): void;} {
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
    const updateButtonOptions = (buttonOptions: ButtonOptions[]) => {
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
}
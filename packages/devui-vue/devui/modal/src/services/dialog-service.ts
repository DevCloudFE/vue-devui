import { Slot, InjectionKey } from 'vue';
// import {h, ref, SetupContext, defineComponent, customRef} from 'vue'
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
  beforeHidden: (() => boolean | Promise<boolean>) | Promise<boolean>
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

    const needHideOrNot = (value: boolean) => {
      if (!value) {
        hide();
      }
    }

    const renderOrigin = (props: typeof resProps, onUpdateModelValue = needHideOrNot) => {
      return this.renderModal(anchor, {
        ...props,
        modelValue: true,
        'onUpdate:modelValue': onUpdateModelValue
      }, {default: content});
    }
    
    

    // 隐藏按钮
    const hide = () => {
      const vnode = renderOrigin(resProps, (value: boolean) => {
        if (!value) {
          this.renderModal(anchor, {...resProps, modelValue: false});
          this.renderNull(anchor);
        } else {
          renderOrigin(resProps);
        }
      });
      vnode.component.exposed.closeModal?.();
    }

    // 更新按钮选项
    const updateButtonOptions = (buttonOptions: ButtonOptions[]) => {
      const { buttons, ...innerResProps } = resProps;
      const newButtonOptions = buttons.map((option, index) => ({
        ...option,
        ...buttonOptions[index]
      }));
      renderOrigin({...innerResProps, buttons: newButtonOptions});
    }

    // 先渲染一次，触发动画用
    this.renderModal(anchor, { modelValue: false });

    // 再渲染详细内容
    renderOrigin(resProps);
    
    return { hide, updateButtonOptions }

    // TODO: 这个需要再考虑设计
    // const CurrentDialog = defineComponent((currentProps: typeof props, ctx: SetupContext) => {
    //   const dialogRef = ref<{closeModal(): void;} | null>();
    //   const visibleRef = ref(true);
    //   const buttonsRef = ref(currentProps.buttons);
    //   ctx.expose({ 
    //     closeModal() {
    //       dialogRef.value?.closeModal?.();
    //     },
    //     updateButtons(buttons: ButtonOptions) {
    //       buttonsRef.value = buttonsRef.value.map((option, index) => ({
    //         ...option,
    //         ...buttons[index]
    //       }));
    //     }
    //   });
    //   return () => {
    //       const {content, ...resProps} = currentProps;
    //       return h(Dialog, {
    //       ...resProps,
    //       ref: dialogRef,
    //       modelValue: visibleRef.value,
    //       'onUpdate:modelValue': (value) => visibleRef.value = value
    //     }, {default: content});
    //   };
    // });
  }
}
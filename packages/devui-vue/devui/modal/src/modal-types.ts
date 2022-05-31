import type { PropType, ExtractPropTypes, Ref } from 'vue';

export const modalProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true,
  },
  beforeClose: {
    type: Function as PropType<(done: () => void) => void>,
  },
  escapable: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
  appendToBody: {
    type: Boolean,
    default: true,
  },
};

export type EmitName = 'update:modelValue';

export type EmitEventFn = (event: EmitName, result?: boolean) => void;

export interface UseModal {
  onCloseBtnClick: () => void;
  onOverlayClick: () => void;
}

export interface UseModalRender {
  showContainer: Ref<boolean>;
  showModal: Ref<boolean>;
}

export type ModalProps = ExtractPropTypes<typeof modalProps>;

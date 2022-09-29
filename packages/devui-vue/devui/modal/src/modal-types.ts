import type { PropType, ExtractPropTypes } from 'vue';

export type ModalType = 'success' | 'failed' | 'warning' | 'info' | '';

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
  draggable: {
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
  showAnimation: {
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
  type: {
    type: String as PropType<ModalType>,
    default: '',
  },
  keepLast: {
    type: Boolean,
    default: false,
  },
};

export type EmitName = 'update:modelValue';

export type EmitEventFn = (event: EmitName, result?: boolean) => void;

export interface UseModal {
  execClose: () => void;
}

export type ModalProps = ExtractPropTypes<typeof modalProps>;

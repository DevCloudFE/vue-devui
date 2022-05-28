import type { PropType, ExtractPropTypes } from 'vue';

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
};

export type EmitName = 'update:modelValue';

export type EmitEventFn = (event: EmitName, result?: boolean) => void;

export type UseModalFn = { handleVisibleChange: (val: boolean) => void };

export type ModalProps = ExtractPropTypes<typeof modalProps>;

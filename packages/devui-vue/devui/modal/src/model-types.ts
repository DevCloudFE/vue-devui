import { ExtractPropTypes, PropType } from 'vue';

export const modalProps = {
  modelValue: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  title: {
    type: String as PropType<string>,
    default: '',
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '50%',
  },
  showClose: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  draggable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  closeOnClickOverlay: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  appendToBody: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  beforeClose: {
    type: Function as PropType<(done: () => void) => void>,
  },
};

export type ModalProps = ExtractPropTypes<typeof modalProps>;

import type { ExtractPropTypes, PropType, Slot } from 'vue';

export const drawerProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 1040,
  },
  width: {
    type: [Number, String]
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
  escKeyCloseable: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
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
  appendToBody: {
    type: Boolean,
    default: true
  }
};

export const drawerOverlayProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function,
  },
};

type DrawerEmitEvent = 'update:modelValue' | 'close' | 'open';

export type DrawerEmit = (event: DrawerEmitEvent, result?: unknown) => void;

export type DrawerProps = ExtractPropTypes<typeof drawerProps>;

export type DrawerOverlayProps = ExtractPropTypes<typeof drawerOverlayProps>;

export type DrawerOptions = Partial<DrawerProps> & { content?: string | Slot };

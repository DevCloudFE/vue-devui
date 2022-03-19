import { ExtractPropTypes } from 'vue';

export type PanelType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';

export const panelProps = {
  type: {
    type: String as () => PanelType,
    default: 'default',
  },
  cssClass: {
    type: String,
    default: '',
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
  beforeToggle: {
    type: Function as unknown as () => (value: boolean, done?: () => void) => unknown,
    default: null,
  },
  showAnimation: {
    type: Boolean,
    default: true,
  },
  hasLeftPadding: {
    type: Boolean,
    default: true,
  },
};

export type PanelProps = ExtractPropTypes<typeof panelProps>;

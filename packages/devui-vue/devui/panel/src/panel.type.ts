import {ExtractPropTypes} from 'vue';

export type PanelType = 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info';

export const PanelProps = {
  type: {
    type: String as () => PanelType,
    default: 'default'
  },
  cssClass: {
    type: String,
    default: ''
  },
  isCollapsed: {
    type: Boolean,
    default: false
  },
  beforeToggle: {
    type: Function as unknown as () => (value: boolean) => boolean | Promise<boolean>,
    default: null
  },
  toggle: {
    type: Function as unknown as () => ((value: boolean) => void),
    default: null
  },
  showAnimation: {
    type: Boolean,
    default: true,
  },
  hasLeftPadding:{
    type: Boolean,
    default: true,
  }
};

export type PanelPropsType = ExtractPropTypes<typeof PanelProps>;

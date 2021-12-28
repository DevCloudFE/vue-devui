import { ExtractPropTypes, PropType } from 'vue';

export type IButtonType = 'button' | 'submit' | 'reset';
export type IButtonVariant = 'common' | 'primary' | 'text' | 'text-dark' | 'danger' | 'success' | 'warning';
export type IButtonPosition = 'left' | 'right' | 'default';
export type IButtonSize = 'lg' | 'md' | 'sm' | 'xs';

export const buttonProps = {
  type: {
    type: String as PropType<IButtonType>,
    default: 'button'
  },
  variant: {
    type: String as PropType<IButtonVariant>,
    default: 'primary'
  },
  size: {
    type: String as PropType<IButtonSize>,
    default: 'md'
  },
  position: {
    type: String as PropType<IButtonPosition>,
    default: 'default'
  },
  bordered: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  showLoading: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>
  }
} as const;


export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
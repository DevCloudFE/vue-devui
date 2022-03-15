import type { ComputedRef, ExtractPropTypes, PropType } from 'vue';

export type IButtonVariant = 'solid' | 'outline' | 'text';
export type IButtonColor = 'secondary' | 'primary' | 'danger';
export type IButtonSize = 'lg' | 'md' | 'sm' | 'xs';

export const buttonProps = {
  variant: {
    type: String as PropType<IButtonVariant>,
    default: 'outline',
  },
  size: {
    type: String as PropType<IButtonSize>,
    default: 'md',
  },
  color: {
    type: String as PropType<IButtonColor>,
  },
  icon: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const;

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export interface UseButtonReturnType {
  classes: ComputedRef<{
    [key: string]: string | boolean;
  }>;
  iconClass: ComputedRef<string>;
}

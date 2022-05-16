import type { ComputedRef, ExtractPropTypes, PropType ,InjectionKey, Ref } from 'vue';

export type IButtonVariant = 'solid' | 'outline' | 'text';
export type IButtonColor = 'secondary' | 'primary' | 'danger';
export type IButtonSize = 'lg' | 'md' | 'sm' | 'xs';
export type IButtonShape = 'round' | 'circle';

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
  shape: {
    type: String as PropType<IButtonShape>,
  }
} as const;

export const buttonGroupProps = {
  size: {
    type: String as PropType<IButtonSize>,
    default: 'md',
  }
} as const;

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>;

export interface UseButtonReturnType {
  classes: ComputedRef<{
    [key: string]: string | boolean;
  }>;
  iconClass: ComputedRef<string>;
}

interface ButtonGroupInjection {
  size: Ref<IButtonSize>;
}

export const buttonGroupInjectionKey: InjectionKey<ButtonGroupInjection> =
  Symbol('d-button-group');


import type { ComputedRef, ExtractPropTypes, PropType ,InjectionKey, Ref } from 'vue';
import { buttonProps } from './api';

export type IButtonVariant = 'solid' | 'outline' | 'text';
export type IButtonColor = 'secondary' | 'primary' | 'danger';
export type IButtonSize = 'lg' | 'md' | 'sm';
export type IButtonShape = 'round' | 'circle';

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


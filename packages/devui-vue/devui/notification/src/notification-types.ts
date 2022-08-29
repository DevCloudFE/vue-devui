import type { ExtractPropTypes, PropType, h } from 'vue';

export type NotificationType = 'normal' | 'success' | 'error' | 'warning' | 'info';

export interface Message {
  type?: NotificationType;
  title?: string;
  content?: string | ((message: Message) => ReturnType<typeof h>);
  duration?: number;
}

export const notificationProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<NotificationType>,
    default: 'normal',
  },
  duration: {
    type: Number,
    default: 3000,
  },
  onClose: {
    type: Function as PropType<() => void>,
  },
};

export type EmitEventFn = (event: 'update:modelValue' | 'destroy', result?: unknown) => void;

export type VoidFn = () => void;

export type NotificationProps = ExtractPropTypes<typeof notificationProps>;

export type NotificationOption = Partial<NotificationProps> & { content?: string };

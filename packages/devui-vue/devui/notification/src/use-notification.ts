import { computed, watch } from 'vue';
import type { ComputedRef } from 'vue';
import { NotificationProps, EmitEventFn, VoidFn } from './notification-types';

export function useNotification(props: NotificationProps): { classes: ComputedRef<Record<string, boolean>> } {
  const classes = computed(() => ({
    'devui-notification-item-container': true,
    [`devui-notification-message-${props.type}`]: true,
  }));

  return { classes };
}

export function useEvent(
  props: NotificationProps,
  emit: EmitEventFn
): { interrupt: VoidFn; removeReset: VoidFn; close: VoidFn; handleDestroy: VoidFn } {
  let timer: NodeJS.Timeout | null = null;
  let timestamp: number;
  const close = () => {
    timer && clearTimeout(timer);
    timer = null;
    props.onClose?.();
    emit('update:modelValue', false);
  };

  const interrupt = () => {
    if (timer && props.duration) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const removeReset = () => {
    if (props.modelValue && props.duration) {
      const remainTime = props.duration - (Date.now() - timestamp);
      timer = setTimeout(close, remainTime);
    }
  };

  const handleDestroy = () => {
    emit('destroy');
  };

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        timestamp = Date.now();
        if (props.duration) {
          timer = setTimeout(close, props.duration);
        }
      }
    }
  );

  return { interrupt, removeReset, close, handleDestroy };
}

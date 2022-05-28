import { onMounted, onUnmounted } from 'vue';
import { ModalProps, EmitEventFn, UseModalFn } from '../modal-types';

export function useModal(props: ModalProps, emit: EmitEventFn): UseModalFn {
  function close(): void {
    emit('update:modelValue', false);
  }
  function handleVisibleChange(val: boolean): void {
    if (!val) {
      props.beforeClose ? props.beforeClose(close) : close();
    }
  }
  function onKeydown(event: KeyboardEvent) {
    if (event['keyCode'] === 27) {
      close();
    }
  }

  onMounted(() => {
    if (props.escapable) {
      window.addEventListener('keydown', onKeydown);
    }
  });

  onUnmounted(() => {
    if (props.escapable) {
      window.addEventListener('keydown', onKeydown);
    }
  });

  return { handleVisibleChange };
}

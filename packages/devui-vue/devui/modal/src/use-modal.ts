import { ModalProps, EmitEventFn, UseModalFn } from './modal-types';

export function useModal(props: ModalProps, emit: EmitEventFn): UseModalFn {
  function close(): void {
    emit('update:modelValue', false);
  }
  function handleVisibleChange(val: boolean): void {
    if (!val) {
      props.beforeClose ? props.beforeClose(close) : close();
    }
  }

  return { handleVisibleChange };
}

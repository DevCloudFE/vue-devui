import { onMounted, onUnmounted, watch } from 'vue';
import { ModalProps, EmitEventFn, UseModal } from '../modal-types';
import { lockScroll } from '../../../shared/utils/lock-scroll';

export function useModal(props: ModalProps, emit: EmitEventFn): UseModal {
  function close(): void {
    emit('update:modelValue', false);
  }
  function execClose() {
    props.beforeClose ? props.beforeClose(close) : close();
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      execClose();
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

  return { execClose };
}

export function useModalRender(props: ModalProps): void {
  let lockScrollCb: () => void;
  const removeBodyAdditions = () => {
    lockScrollCb?.();
  };
  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        props.lockScroll && (lockScrollCb = lockScroll());
      } else {
        removeBodyAdditions();
      }
    },
    {
      immediate: true,
    }
  );

  onUnmounted(removeBodyAdditions);
}

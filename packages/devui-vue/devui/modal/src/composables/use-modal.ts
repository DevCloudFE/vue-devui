import { onMounted, onUnmounted, watch, ref, nextTick } from 'vue';
import { ModalProps, EmitEventFn, UseModal, UseModalRender } from '../modal-types';
import { lockScroll } from '../../../shared/utils/lock-scroll';

export function useModal(props: ModalProps, emit: EmitEventFn): UseModal {
  function close(): void {
    emit('update:modelValue', false);
  }
  function execClose() {
    props.beforeClose ? props.beforeClose(close) : close();
  }
  function onOverlayClick() {
    props.closeOnClickOverlay && execClose();
  }
  function onCloseBtnClick() {
    execClose();
  }

  function onKeydown(event: KeyboardEvent) {
    if (event['keyCode'] === 27) {
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

  return { onCloseBtnClick, onOverlayClick };
}

export function useModalRender(props: ModalProps): UseModalRender {
  const showContainer = ref(false);
  const showModal = ref(false);
  let lockScrollCb: () => void;
  const removeBodyAdditions = () => {
    lockScrollCb?.();
  };
  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        props.lockScroll && (lockScrollCb = lockScroll());
        showContainer.value = true;
        nextTick(() => {
          showModal.value = true;
        });
      } else {
        removeBodyAdditions();
        showModal.value = false;
        setTimeout(() => {
          showContainer.value = false;
        }, 100);
      }
    }
  );

  onUnmounted(removeBodyAdditions);

  return { showContainer, showModal };
}

import { onUnmounted, watch, ref } from 'vue';
import { ModalProps, EmitEventFn, UseModal } from '../modal-types';
import { lockScroll } from '../../../shared/utils/lock-scroll';
import { useNamespace, focusStack } from '@devui/shared'
import type { FoucusLayer } from '@devui/shared'
import { ZINDEX } from '../const'

export function useModal(props: ModalProps, emit: EmitEventFn): UseModal {
  let lockScrollCb: () => void;
  const ns = useNamespace('modal')
  const overlayZIndex = ref('')
  const modalZIndex = ref('')
  const paused = ref(false)
  const layer: FoucusLayer = {
    pause() {
      paused.value = true
    },
    resume() {
      paused.value = false
    }
  }

  const removeAdditions = () => {
    lockScrollCb?.()
    props.escapable && window.removeEventListener('keyup', onKeydown)
    setTimeout(() => {
      focusStack.remove(layer)
    });
  }
  function close(): void {
    emit('update:modelValue', false);
    emit('close');
  }
  function execClose() {
    props.beforeClose ? props.beforeClose(close) : close();
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.code === 'Escape' && !paused.value) {
      execClose();
    }
  }

  function calculateZIndex() {
    const modalDomsLength = document.querySelectorAll(`.${ns.b()}`).length
    overlayZIndex.value = `calc(var(--devui-z-index-modal, 1050) + ${(modalDomsLength - 1) * ZINDEX} - 1)`
    modalZIndex.value = `calc(var(--devui-z-index-modal, 1050) + ${(modalDomsLength - 1) * ZINDEX})`
  }

  watch(
    () => props.modelValue,
    (val, oldVal) => {
      if (val) {
        calculateZIndex()
        props.lockScroll && (lockScrollCb = lockScroll());
        props.escapable && window.addEventListener('keyup', onKeydown)
        focusStack.push(layer)
      } else {
        oldVal !== undefined && removeAdditions()
      }
    },
    {
      immediate: true,
      flush: 'post'
    }
  );

  onUnmounted(removeAdditions);

  return { execClose, overlayZIndex, modalZIndex };

}
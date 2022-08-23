import { computed, onUnmounted, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { DrawerEmit, DrawerProps, UseDrawerFn } from './drawer-types';
import { lockScroll } from '../../shared/utils/lock-scroll';
import { useNamespace } from '../../shared/hooks/use-namespace';

export function useDrawer(props: DrawerProps, emit: DrawerEmit): UseDrawerFn {
  const ns = useNamespace('drawer');
  const modalNs = useNamespace('modal', true);
  const drawerRef = ref<HTMLElement>();
  const overlayRef = ref<HTMLElement>();
  const drawerClasses = computed(() => ({
    [ns.b()]: true,
    [ns.m(props.position)]: true,
  }));
  const close = () => {
    emit('update:modelValue', false);
    emit('close');
  };
  let lockScrollCb: () => void;
  const execClose = () => {
    props.beforeClose ? props.beforeClose(close) : close();
  };
  const handleOverlayClick = () => {
    props.closeOnClickOverlay && execClose();
  };
  const handleEscClose = (e: KeyboardEvent) => {
    e.code === 'Escape' && execClose();
  };
  const handleClickOutside = (e: PointerEvent) => {
    const composedPath = e.composedPath();
    const modalOverlay = document.querySelectorAll(modalNs.e('overlay'));
    const modal = document.querySelectorAll(modalNs.b());
    const isClickModalOverlay = Array.from(modalOverlay).filter((item) => composedPath.includes(item));
    const isClickModal = Array.from(modal).filter((item) => composedPath.includes(item));
    if (isClickModalOverlay.length || isClickModal.length) {
      return;
    }
    execClose();
  };

  setTimeout(() => {
    onClickOutside(drawerRef, handleClickOutside, { capture: false, ignore: [overlayRef] });
  });

  const removeBodyAdditions = () => {
    lockScrollCb?.();
    document.removeEventListener('keyup', handleEscClose);
  };

  watch(
    () => props.modelValue,
    (val) => {
      if (val) {
        emit('open');
        props.lockScroll && (lockScrollCb = lockScroll());
        props.escKeyCloseable && document.addEventListener('keyup', handleEscClose);
      } else {
        removeBodyAdditions();
      }
    }
  );

  onUnmounted(removeBodyAdditions);

  return { overlayRef, drawerRef, drawerClasses, handleOverlayClick };
}

import { computed, onUnmounted, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { DrawerEmit, DrawerProps, UseDrawerFn } from './drawer-types';
import { lockScroll } from '../../shared/util/lock-scroll';

export function useDrawer(props: DrawerProps, emit: DrawerEmit): UseDrawerFn {
  const drawerRef = ref<HTMLElement>();
  const drawerClasses = computed(() => ({
    'devui-drawer': true,
    [`devui-drawer-${props.position}`]: true,
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

  onClickOutside(drawerRef, execClose);

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

  return { drawerRef, drawerClasses, handleOverlayClick };
}

import { computed, onUnmounted, ref, watch, toRefs } from 'vue';
import { onClickOutside, OnClickOutsideOptions } from '@vueuse/core';
import { DrawerEmit, DrawerProps } from './drawer-types';
import { lockScroll, } from '../../shared/utils/lock-scroll';
import { focusStack } from '../../shared/utils/focus-stack';
import type { FoucusLayer } from '../../shared/utils/focus-stack';
import { useNamespace } from '@devui/shared/utils';
import { ZINDEX } from './const';

export function useDrawer(props: DrawerProps, emit: DrawerEmit) {
  const ns = useNamespace('drawer');
  const { zIndex } = toRefs(props);
  const drawerRef = ref<HTMLElement>();
  const overlayRef = ref<HTMLElement>();
  const overlayZIndex = ref(zIndex.value - 1);
  const drawerZIndex = ref(zIndex.value);
  const paused = ref(false);
  const drawerClasses = computed(() => ({
    [ns.b()]: true,
    [ns.m(props.position)]: true,
  }));
  const layer: FoucusLayer = {
    pause() {
      paused.value = true;
    },
    resume() {
      paused.value = false;
    }
  };
  const close = () => {
    emit('update:modelValue', false);
    emit('close');
  };
  let lockScrollCb: () => void;
  const execClose = () => {
    props.beforeClose ? props.beforeClose(close) : close();
  };
  const handleOverlayClick = () => {
    if (props.closeOnClickOverlay && !paused.value) {
      execClose();
    }
  };
  const handleEscClose = (e: KeyboardEvent) => {
    if (e.code === 'Escape' && !paused.value) {
      execClose();
    }
  };
  const handleClickOutside = () => {
    if (paused.value) {
      return;
    }
    execClose();
  };

  setTimeout(() => {
    onClickOutside(drawerRef, handleClickOutside, { capture: false, ignore: [overlayRef] } as OnClickOutsideOptions);
  });

  const calculateZIndex = () => {
    const drawerDomLength = document.querySelectorAll(`.${ns.b()}`).length;
    overlayZIndex.value = zIndex.value + (drawerDomLength - 1) * ZINDEX - 1;
    drawerZIndex.value = zIndex.value + (drawerDomLength - 1) * ZINDEX;
  };

  const removeBodyAdditions = () => {
    window._dvDrawerIsOpen = false;
    lockScrollCb?.();
    document.removeEventListener('keyup', handleEscClose);
    setTimeout(() => {
      focusStack.remove(layer);
    });
  };

  watch(
    () => props.modelValue,
    (val, oldVal) => {
      if (val) {
        emit('open');
        props.lockScroll && (lockScrollCb = lockScroll());
        props.escKeyCloseable && document.addEventListener('keyup', handleEscClose);
        window._dvDrawerIsOpen = true;
        calculateZIndex();
        focusStack.push(layer);
      } else {
        oldVal !== undefined && removeBodyAdditions();
      }
    },
    {
      immediate: true,
      flush: 'post'
    }
  );

  onUnmounted(removeBodyAdditions);

  return { overlayRef, drawerRef, drawerClasses, overlayZIndex, drawerZIndex, handleOverlayClick };
}

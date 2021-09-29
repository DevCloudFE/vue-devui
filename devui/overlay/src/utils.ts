import { onUnmounted, watch, computed, ComputedRef } from 'vue';
import { OverlayProps } from './overlay-types';

interface CommonInfo {
  backgroundClass: ComputedRef<string[]>
  overlayClass: ComputedRef<string>
  handleBackdropClick: (e: Event) => void
  handleOverlayBubbleCancel: (e: Event) => void
}

export function useOverlayLogic(props: OverlayProps): CommonInfo {
  const backgroundClass = computed(() => {
    return ['devui-overlay-background', 'devui-overlay-background__color', props.backgroundClass];
  });
  const overlayClass = computed(() => {
    return 'devui-overlay';
  });

  const handleBackdropClick = (event: Event) => {
    event.preventDefault();

    props.backdropClick?.();
    if (props.backdropClose) {
      props['onUpdate:visible']?.(false);
    }
  };

  const handleOverlayBubbleCancel = (event: Event) => (event.cancelBubble = true);


  const body = document.body;
  const originOverflow = body.style.overflow;
  watch([() => props.visible, () => props.backgroundBlock], ([visible, backgroundBlock]) => {
    if (backgroundBlock) {
      body.style.overflow = visible ? 'hidden' : originOverflow;
    }
  });

  onUnmounted(() => {
    body.style.overflow = originOverflow;
  });

  return {
    backgroundClass,
    overlayClass,
    handleBackdropClick,
    handleOverlayBubbleCancel
  }
}

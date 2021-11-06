import { onUnmounted, watch, computed, ComputedRef, onMounted } from 'vue';
import { OverlayProps } from './overlay-types';

interface CommonInfo {
  backgroundClass: ComputedRef<string[]>
  overlayClass: ComputedRef<string>
  handleBackdropClick: (e: Event) => void
  handleOverlayBubbleCancel: (e: Event) => void
}

export function useOverlayLogic(props: OverlayProps): CommonInfo {
  const backgroundClass = computed(() => {
    return [
      'devui-overlay-background',
      props.backgroundClass,
      !props.hasBackdrop ? 'devui-overlay-background__disabled' : 'devui-overlay-background__color',
    ];
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

  onMounted(() => {
    const body = document.body;
    const originOverflow = body.style.overflow;
    const originPosition = body.style.position;
    watch([() => props.visible, () => props.backgroundBlock], ([visible, backgroundBlock]) => {
      if (backgroundBlock) {
        const top = body.getBoundingClientRect().y;
        if (visible) {
          body.style.overflowY = 'scroll';
          body.style.position = visible ? 'fixed' : '';
          body.style.top = `${top}px`;
        } else {
          body.style.overflowY = originOverflow;
          body.style.position = originPosition;
          body.style.top = '';
          window.scrollTo(0, -top);
        }
      }
    });
    onUnmounted(() => {
      document.body.style.overflow = originOverflow;
    });
  });

  return {
    backgroundClass,
    overlayClass,
    handleBackdropClick,
    handleOverlayBubbleCancel
  }
}

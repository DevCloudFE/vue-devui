import { onUnmounted, watch, computed, ComputedRef, onMounted, SetupContext } from 'vue';
import { OverlayProps, overlayEmits } from './fixed-overlay-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

interface CommonInfo {
  backgroundClass: ComputedRef<string[]>;
  overlayClass: ComputedRef<string>;
  handleBackdropClick: (e: Event) => void;
  handleOverlayBubbleCancel: (e: Event) => void;
}

export function useOverlayLogic(props: OverlayProps, ctx: SetupContext<typeof overlayEmits>): CommonInfo {
  const ns = useNamespace('overlay');
  const backgroundClass = computed(() => {
    return [ns.e('background'), props.backgroundClass, !props.hasBackdrop ? ns.em('background', 'disabled') : ns.em('background', 'color')];
  });
  const overlayClass = computed(() => {
    return ns.b();
  });

  const handleBackdropClick = (event: Event) => {
    event.preventDefault();
    props.onBackdropClick?.();
    if (props.backdropClose) {
      ctx.emit('update:visible', false);
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
    handleOverlayBubbleCancel,
  };
}

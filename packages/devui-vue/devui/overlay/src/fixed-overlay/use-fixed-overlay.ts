import { onUnmounted, SetupContext, watch } from 'vue';
import { FixedOverlayProps, UseFixedOverlay } from './fixed-overlay-types';
import { lockScroll } from '../../../shared/utils/lock-scroll';

export function useFixedOverlay(props: FixedOverlayProps, ctx: SetupContext): UseFixedOverlay {
  let lockScrollCb: () => void;

  const onClick = (event: Event) => {
    event.preventDefault();
    ctx.emit('click', event);
    if (props.closeOnClickOverlay) {
      ctx.emit('update:modelValue', false);
    }
  };

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
    }
  );

  onUnmounted(removeBodyAdditions);

  return { onClick };
}

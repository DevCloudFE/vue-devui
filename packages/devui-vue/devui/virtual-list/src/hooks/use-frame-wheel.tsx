import type { Ref } from 'vue';
import { isFF } from '../utils';
import useOriginScroll from './use-origin-scroll';

interface FireFoxDOMMouseScrollEvent {
  detail?: number;
  preventDefault?: () => void;
}

export default function useFrameWheel(
  inVirtual: Ref<boolean>,
  isScrollAtTop: Ref<boolean>,
  isScrollAtBottom: Ref<boolean>,
  onWheelDelta: (offset: number) => void,
): [(e: WheelEvent) => void, (e: FireFoxDOMMouseScrollEvent) => void] {
  let offsetRef = 0;
  let nextFrame: number | null | undefined = null;

  let wheelValue: number | null | undefined = null;
  let isMouseScroll = false;

  const originScroll = useOriginScroll(isScrollAtTop, isScrollAtBottom);

  const onRawWheel = (event: { preventDefault?: (offset?: number) => void; deltaY: number }) => {
    if (!inVirtual.value) {return;}

    if (nextFrame) {
      window.cancelAnimationFrame(nextFrame);
    }

    const { deltaY } = event;
    offsetRef += deltaY;
    wheelValue = deltaY;

    if (originScroll(deltaY, false)) {return;}

    if (!isFF) {
      event?.preventDefault?.();
    }

    nextFrame = window.requestAnimationFrame(() => {
      const patchMultiple = isMouseScroll ? 10 : 1;
      onWheelDelta(offsetRef * patchMultiple);
      offsetRef = 0;
    });
  };

  const onFireFoxScroll = (event: FireFoxDOMMouseScrollEvent) => {
    if (!inVirtual.value) {return;}
    isMouseScroll = event.detail === wheelValue;
  };

  return [onRawWheel, onFireFoxScroll];
}

import { defineComponent, ref, reactive, computed, onBeforeUnmount, onMounted } from 'vue';
import { scrollBarProps } from '../virtual-list-types';

interface ScrollBarState {
  dragging: boolean;
  pageY: number | null;
  startTop: number | null;
  visible: boolean;
}

function getPageY(e: MouseEvent | TouchEvent) {
  return 'touches' in e ? e.touches[0].pageY : e.pageY;
}

export default defineComponent({
  name: 'ScrollBar',
  props: scrollBarProps,
  setup(props, ctx) {
    const scrollbarRef = ref<HTMLElement | null>(null);
    const thumbRef = ref<HTMLElement | null>(null);
    const moveRaf = ref<number>(0);
    const state = reactive<ScrollBarState>({
      dragging: false,
      pageY: null,
      startTop: null,
      visible: false,
    });
    const visibleTimeout = ref<NodeJS.Timeout | null>(null);

    const canScroll = computed(() => {
      return (props.scrollHeight || 0) > (props.height || 0);
    });

    const getSpinHeight = () => {
      const { height = 0, count = 0 } = props;
      let baseHeight = (height / count) * 10;
      baseHeight = Math.max(baseHeight, 20);
      baseHeight = Math.min(baseHeight, height / 2);
      return Math.floor(baseHeight);
    };

    const getEnableScrollRange = () => {
      const { scrollHeight = 0, height = 0 } = props;
      return scrollHeight - height || 0;
    };

    const getEnableHeightRange = () => {
      const { height = 0 } = props;
      const spinHeight = getSpinHeight();
      return height - spinHeight || 0;
    };

    const getTop = () => {
      const { scrollTop = 0 } = props;
      const enableScrollRange = getEnableScrollRange();
      const enableHeightRange = getEnableHeightRange();
      if (scrollTop === 0 || enableScrollRange === 0) {
        return 0;
      }
      const ptg = scrollTop / enableScrollRange;
      return ptg * enableHeightRange;
    };

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      const { dragging, pageY, startTop } = state;
      const { onScroll } = props;
      window.cancelAnimationFrame(moveRaf.value);
      if (dragging) {
        const offsetY = getPageY(e) - (pageY || 0);
        const newTop = (startTop || 0) + offsetY;
        const enableScrollRange = getEnableScrollRange();
        const enableHeightRange = getEnableHeightRange();
        const ptg = enableHeightRange ? newTop / enableHeightRange : 0;
        const newScrollTop = Math.ceil(ptg * enableScrollRange);
        moveRaf.value = window.requestAnimationFrame(() => {
          if (onScroll) {
            onScroll(newScrollTop);
          }
        });
      }
    };

    const onMouseUp = (callback: () => void) => {
      const { onStopMove } = props;
      state.dragging = false;
      if (onStopMove) {
        onStopMove();
      }
      if (callback) {
        callback();
      }
    };
    const onMouseDown = (e: MouseEvent | TouchEvent, callback: () => void) => {
      const { onStartMove } = props;
      Object.assign(state, {
        dragging: true,
        pageY: getPageY(e),
        startTop: getTop(),
      });
      if (onStartMove) {
        onStartMove();
      }
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', () => onMouseUp(callback));
      thumbRef?.value?.addEventListener(
        'touchmove',
        onMouseMove,
        ({ passive: false } as EventListenerOptions) ,
      );
      thumbRef?.value?.addEventListener('touchend', () => onMouseUp(callback));
      e.stopPropagation();
      e.preventDefault();
    };

    const removeEvents = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', () => onMouseUp(removeEvents));

      scrollbarRef?.value?.removeEventListener(
        'touchstart',
        (e: TouchEvent) => { e.preventDefault(); },
        ({ passive: false } as EventListenerOptions) ,
      );
      thumbRef?.value?.removeEventListener(
        'touchstart',
        (e) => onMouseDown(e, removeEvents),
        ({ passive: false } as EventListenerOptions) ,
      );
      thumbRef?.value?.removeEventListener(
        'touchmove',
        onMouseMove,
        ({ passive: false } as EventListenerOptions) ,
      );
      thumbRef?.value?.removeEventListener('touchend', () => onMouseUp(removeEvents));

      window.cancelAnimationFrame(moveRaf.value);
    };

    const onContainerMouseDown = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };

    onBeforeUnmount(() => {
      removeEvents();
      if (visibleTimeout.value) {
        clearTimeout(visibleTimeout.value);
      }
    });

    onMounted(() => {
      scrollbarRef?.value?.addEventListener(
        'touchstart',
        (e: TouchEvent) => {
          e.preventDefault();
        },
        ({ passive: false } as EventListenerOptions) ,
      );
      thumbRef.value?.addEventListener(
        'touchstart',
        (e) => onMouseDown(e, removeEvents),
        ({ passive: false } as EventListenerOptions) ,
      );
    });

    const onShowBar = () => {
      if (visibleTimeout.value) {
        clearTimeout(visibleTimeout.value);
      }
      state.visible = true;
      visibleTimeout.value = setTimeout(() => {
        state.visible = false;
      }, 1000);
    };

    ctx.expose({
      onShowBar,
    });

    return () => {
      const display = canScroll.value && state.visible ? undefined : 'none';
      return (
        <div
          ref={scrollbarRef}
          style={{
            width: '8px',
            top: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display,
          }}
          onMousedown={onContainerMouseDown}
          onMousemove={onShowBar}
        >
          <div
            ref={thumbRef}
            style={{
              width: '100%',
              height: getSpinHeight() + 'px',
              top: getTop() + 'px',
              left: 0,
              position: 'absolute',
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '99px',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onMousedown={(e) => onMouseDown(e, removeEvents)}
          />
        </div>
      );
    };
  }
});

import type { SetupContext, CSSProperties, HTMLAttributes } from 'vue';
import {
  defineComponent,
  toRefs,
  ref,
  shallowRef,
  reactive,
  computed,
  watch,
  toRaw,
  onMounted,
  onUpdated,
  nextTick,
  watchEffect,
  onBeforeUnmount
} from 'vue';
import type { VirtualListProps, RenderFunc, SharedConfig, IScrollBarExposeFunction } from './virtual-list-types';
import { virtualListProps } from './virtual-list-types';
import useVirtual from './hooks/use-virtual';
import useHeights from './hooks/use-heights';
import useOriginScroll from './hooks/use-origin-scroll';
import useFrameWheel from './hooks/use-frame-wheel';
import useMobileTouchMove from './hooks/use-mobile-touch-move';
import Filler from './components/filler';
import ScrollBar from './components/scroll-bar';
import { renderChildren } from './components/item';

export interface ListState {
  scrollTop: number;
  scrollMoving: boolean;
}

const ScrollStyle: CSSProperties = {
  overflowY: 'auto',
  overflowAnchor: 'none',
};

type ItemKeyFunction = (_item: Record<string, never>) => string | number;

export default defineComponent({
  name: 'DVirtualList',
  props: virtualListProps,
  setup(props: VirtualListProps, ctx: SetupContext) {
    const { style, class: className, component, ...restProps } = toRefs(props);
    const { isVirtual, inVirtual } = useVirtual(props);
    const state = reactive<ListState>({
      scrollTop: 0,
      scrollMoving: false,
    });
    const data = computed(() => {
      return props.data || [];
    });
    const mergedData = shallowRef<Record<string, never>[]>([]);
    watch(
      data,
      () => {
        mergedData.value = toRaw(data.value).slice();
      },
      { immediate: true },
    );
    const itemKey = shallowRef<ItemKeyFunction | null>(null);
    watch(
      () => props.itemKey,
      (val) => {
        if (typeof val === 'function') {
          itemKey.value = val as unknown as ItemKeyFunction;
        } else {
          itemKey.value = item => item?.[val];
        }
      },
      { immediate: true },
    );
    const componentRef = ref<HTMLDivElement>();
    const fillerInnerRef = ref<HTMLDivElement>();
    const barRef = ref<IScrollBarExposeFunction>();
    const getKey = (item: Record<string, never>) => {
      if (!itemKey.value) { return; }
      return itemKey.value(item);
    };
    const sharedConfig: SharedConfig<Record<string, never>> = {
      getKey,
    };

    const [setInstance, collectHeight, heights, updatedMark] = useHeights<Record<string, never>>(
      mergedData,
      getKey,
      null,
      null,
    );

    const calRes = reactive<{
      scrollHeight?: number;
      start: number;
      end: number;
      offset?: number;
    }>({
      scrollHeight: undefined,
      start: 0,
      end: 0,
      offset: undefined,
    });

    const offsetHeight = ref(0);

    onMounted(() => {
      nextTick(() => {
        offsetHeight.value = fillerInnerRef.value?.offsetHeight || 0;
      });
    });

    onUpdated(() => {
      nextTick(() => {
        offsetHeight.value = fillerInnerRef.value?.offsetHeight || 0;
      });
    });

    watch(
      [isVirtual, mergedData],
      () => {
        if (!isVirtual.value) {
          Object.assign(calRes, {
            scrollHeight: undefined,
            start: 0,
            end: mergedData.value.length - 1,
            offset: undefined,
          });
        }
      },
      { immediate: true },
    );

    watch(
      [isVirtual, mergedData, offsetHeight, inVirtual],
      () => {
        if (isVirtual.value && !inVirtual.value) {
          Object.assign(calRes, {
            scrollHeight: offsetHeight.value,
            start: 0,
            end: mergedData.value.length - 1,
            offset: undefined,
          });
        }
      },
      { immediate: true },
    );

    watch(
      [
        inVirtual,
        isVirtual,
        () => state.scrollTop,
        mergedData,
        updatedMark,
        () => props.height,
        offsetHeight,
      ],
      () => {
        if (!isVirtual.value || !inVirtual.value) {
          return;
        }
        let itemTop = 0;
        let startIndex: number | undefined;
        let startOffset: number | undefined;
        let endIndex: number | undefined;
        const dataLen = mergedData.value.length;
        const currentData = mergedData.value;
        const scrollTop = state.scrollTop;
        const { itemHeight, height } = props;
        const scrollTopHeight = scrollTop + height;
        for (let i = 0; i < dataLen; i += 1) {
          const currentItem = currentData[i];
          const key = getKey(currentItem);
          let cacheHeight = heights.get(key);
          if (cacheHeight === undefined) {
            cacheHeight = itemHeight;
          }
          const currentItemBottom = itemTop + cacheHeight;
          if (startIndex === undefined && currentItemBottom >= scrollTop) {
            startIndex = i;
            startOffset = itemTop;
          }
          if (endIndex === undefined && currentItemBottom > scrollTopHeight) {
            endIndex = i;
          }
          itemTop = currentItemBottom;
        }
        if (startIndex === undefined) {
          startIndex = 0;
          startOffset = 0;
        }
        if (endIndex === undefined) {
          endIndex = dataLen - 1;
        }
        endIndex = Math.min(endIndex + 1, dataLen);
        Object.assign(calRes, {
          scrollHeight: itemTop,
          start: startIndex,
          end: endIndex,
          offset: startOffset,
        });
      },
      { immediate: true },
    );

    const maxScrollHeight = computed(() => (calRes.scrollHeight || 0) - props.height);

    const keepInRange = (newScrollTop: number) => {
      let newTop = newScrollTop;
      if (!Number.isNaN(maxScrollHeight.value)) {
        newTop = Math.min(newTop, maxScrollHeight.value);
      }
      newTop = Math.max(newTop, 0);
      return newTop;
    };

    const isScrollAtTop = computed(() => state.scrollTop <= 0);

    const isScrollAtBottom = computed(() => state.scrollTop >= maxScrollHeight.value);

    const originScroll = useOriginScroll(isScrollAtTop, isScrollAtBottom);

    const syncScrollTop = (newTop: number | ((prev: number) => number)) => {
      let value: number;
      if (typeof newTop === 'function') {
        value = newTop(state.scrollTop);
      } else {
        value = newTop;
      }
      const alignedTop = keepInRange(value);
      if (componentRef.value) {
        componentRef.value.scrollTop = alignedTop;
      }
      state.scrollTop = alignedTop;
    };

    const onScrollBar = (newScrollTop: number) => {
      const newTop = newScrollTop;
      syncScrollTop(newTop);
    };

    const onComponentScroll = (e: UIEvent) => {
      const { scrollTop: newScrollTop } = e.currentTarget as Element;
      if (Math.abs(newScrollTop - state.scrollTop) >= 1) {
        syncScrollTop(newScrollTop);
      }
      barRef?.value?.onShowBar?.();
      props.onScroll?.(e);
    };

    const [onRawWheel, onFireFoxScroll] = useFrameWheel(
      isVirtual,
      isScrollAtTop,
      isScrollAtBottom,
      (offsetY: number) => {
        syncScrollTop(top => {
          const newTop = top + offsetY;
          return newTop;
        });
      },
    );

    useMobileTouchMove(isVirtual, componentRef, (deltaY, smoothOffset) => {
      if (originScroll(deltaY, !!smoothOffset)) {
        return false;
      }
      onRawWheel({ deltaY } as WheelEvent);
      return true;
    });

    const onMozMousePixelScroll = (e: Event) => {
      if (isVirtual.value) {
        e.preventDefault();
      }
    };

    const removeEventListener = () => {
      if (componentRef.value) {
        componentRef.value.removeEventListener(
          'wheel',
          onRawWheel,
          ({ passive: false } as EventListenerOptions),
        );
        componentRef.value.removeEventListener('DOMMouseScroll', onFireFoxScroll);
        componentRef.value.removeEventListener('MozMousePixelScroll', onMozMousePixelScroll);
      }
    };

    watchEffect(() => {
      nextTick(() => {
        if (componentRef.value) {
          removeEventListener();
          componentRef.value.addEventListener(
            'wheel',
            onRawWheel,
            ({ passive: false } as EventListenerOptions),
          );
          componentRef.value.addEventListener('DOMMouseScroll', onFireFoxScroll);
          componentRef.value.addEventListener('MozMousePixelScroll', onMozMousePixelScroll);
        }
      });
    });

    onBeforeUnmount(() => {
      removeEventListener();
    });

    const componentStyle = computed(() => {
      let cs: CSSProperties | null = null;
      if (props.height) {
        cs = { [props.fullHeight ? 'height' : 'maxHeight']: props.height + 'px', ...ScrollStyle };
        if (isVirtual.value) {
          cs.overflowY = 'hidden';
          if (state.scrollMoving) {
            cs.pointerEvents = 'none';
          }
        }
      }
      return cs;
    });

    // Returns the data in the view
    watch(
      [() => calRes.start, () => calRes.end, mergedData],
      () => {
        if (props.onVisibleChange) {
          const renderList = mergedData.value.slice(calRes.start, calRes.end + 1);
          props.onVisibleChange(renderList, mergedData.value);
        }
      },
      { flush: 'post' },
    );

    return () => {
      const Component = component.value as keyof HTMLAttributes;
      return (
        <div
          style={{ ...style, position: 'relative' }}
          class={className.value}
          ref={ref}
          {...restProps}
          onScroll={(e) => e}
        >
          <Component
            style={componentStyle.value as HTMLAttributes['style']}
            ref={componentRef}
            onScroll={onComponentScroll}
          >
            <Filler
              height={calRes.scrollHeight}
              offset={calRes.offset}
              onInnerResize={collectHeight}
              ref={fillerInnerRef}
              v-slots={{
                default: () =>
                  renderChildren(
                    mergedData.value,
                    calRes.start,
                    calRes.end,
                    setInstance,
                    sharedConfig,
                    ctx.slots.default as RenderFunc<unknown>,
                  ),
              }}
            />
          </Component>
          {isVirtual.value && (
            <ScrollBar
              ref={barRef}
              scrollTop={state.scrollTop}
              height={props.height}
              scrollHeight={calRes.scrollHeight}
              count={mergedData.value.length}
              onScroll={onScrollBar}
              onStartMove={() => {
                state.scrollMoving = true;
              }}
              onStopMove={() => {
                state.scrollMoving = false;
              }}
            />
          )}
        </div>
      );
    };
  }
});

import type { SetupContext, CSSProperties, HTMLAttributes } from 'vue';
import {
  defineComponent,
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
  onBeforeUnmount,
  unref
} from 'vue';
import type { VirtualListProps, RenderFunc, IScrollBarExposeFunction } from './virtual-list-types';
import { virtualListProps } from './virtual-list-types';
import useVirtual from './hooks/use-virtual';
import useHeights from './hooks/use-heights';
import useOriginScroll from './hooks/use-origin-scroll';
import useFrameWheel from './hooks/use-frame-wheel';
import useMobileTouchMove from './hooks/use-mobile-touch-move';
import ResizeObserverContainer from './components/container';
import ScrollBar from './components/scroll-bar';
import { renderChildren } from './components/item';
import { DEFAULT_ITEM_HEIGHT } from './const';

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
          if (val) {
            itemKey.value = item => item?.[val];
          }
        }
      },
      { immediate: true },
    );
    const componentRef = ref<HTMLDivElement>();
    const fillerInnerRef = ref<HTMLDivElement>();
    const barRef = ref<IScrollBarExposeFunction>();
    const getKey = (item: Record<string, never>) => {
      if (!itemKey.value || !props.itemKey) { return; }
      return itemKey.value(item);
    };

    const [setInstance, collectHeight, heights, updatedMark] = useHeights<Record<string, never>>(
      mergedData,
      getKey,
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
        if (!isVirtual.value || !inVirtual.value) { return; }
        let itemTop = 0;
        let startIndex: number | undefined;
        let startOffset: number | undefined;
        let endIndex: number | undefined;
        const mergedDataValue = unref(mergedData);
        const scrollTop = state.scrollTop;
        const { height } = props;
        const scrollTopHeight = scrollTop + height;
        for (let i = 0; i < mergedDataValue.length; i += 1) {
          const mergedDataItem = mergedDataValue[i];
          let cacheHeight;
          if (props.itemKey) {
            const key = getKey(mergedDataItem);
            cacheHeight = heights.get(key);
          }
          if (cacheHeight === undefined) {
            cacheHeight = props.itemHeight || DEFAULT_ITEM_HEIGHT;
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
          endIndex = mergedDataValue.length - 1;
        }
        endIndex = Math.min(endIndex + 1, mergedDataValue.length);
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

    const oldScrollTop = ref(0);
    const onComponentScroll = (e: UIEvent) => {
      const { scrollTop: newScrollTop } = e.currentTarget as Element;
      if (Math.abs(newScrollTop - state.scrollTop) >= 1) {
        syncScrollTop(newScrollTop);
      }
      if (oldScrollTop.value) {
        barRef?.value?.onShowBar?.();
      }
      oldScrollTop.value = newScrollTop;
      ctx.emit('scroll', e);
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
        cs = { maxHeight: isVirtual.value ? props.height + 'px' : undefined, ...ScrollStyle };
        if (isVirtual.value) {
          cs.overflowY = 'hidden';
          if (state.scrollMoving) {
            cs.pointerEvents = 'none';
          }
        }
      }
      return cs;
    });

    watch(
      [() => calRes.start, () => calRes.end, mergedData],
      () => {
        const renderList = mergedData.value.slice(calRes.start, calRes.end + 1);
        ctx.emit('show-change', renderList, mergedData.value);
      },
      { flush: 'post' },
    );

    ctx.expose({
      scrollTo(index: number) {
        syncScrollTop(index * (props.itemHeight || DEFAULT_ITEM_HEIGHT));
      }
    });

    return () => {
      const Component = props.component as keyof HTMLAttributes;
      return (
        <div style={{ position: 'relative' }}>
          <Component
            style={componentStyle.value as HTMLAttributes['style']}
            ref={componentRef}
            onScroll={onComponentScroll}
          >
            <ResizeObserverContainer
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
                    { getKey },
                    ctx.slots.item as RenderFunc<unknown>,
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

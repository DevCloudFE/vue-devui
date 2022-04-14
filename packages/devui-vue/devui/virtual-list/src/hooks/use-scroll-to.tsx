import type { ShallowRef, Ref } from 'vue';
import type { VirtualListProps, CacheMap } from '../virtual-list-types';
import raf from '../raf';
type GetKey<T = Record<string, never>> = (item: T) => string | number | undefined;
type IUseScrollToArg = null | number | { offset: number; align: 'top' | 'bottom'; index: number; key: string | number };
export default function useScrollTo(
  containerRef: Ref<Element | undefined>,
  mergedData: ShallowRef<unknown[]>,
  heights: CacheMap,
  props: VirtualListProps,
  getKey: GetKey,
  collectHeight: () => void,
  syncScrollTop: (newTop: number) => void,
  triggerFlash: () => void,
): (arg?: IUseScrollToArg) => void {
  let scroll: number;

  return (arg?: IUseScrollToArg) => {
    if (arg === null || arg === undefined) {
      triggerFlash();
      return;
    }

    if (scroll) {
      raf.cancel(scroll);
    }
    const data = mergedData.value;
    const itemHeight = props.itemHeight;
    if (typeof arg === 'number') {
      syncScrollTop(arg);
    } else if (arg && typeof arg === 'object') {
      let index: number;
      const { align } = arg;

      if (arg.index) {
        index = arg.index;
      } else {
        index = data.findIndex(
          (item) => getKey(item as Record<string, never>) === arg.key
        );
      }

      const { offset = 0 } = arg;

      const syncScroll = (times: number, targetAlign?: 'top' | 'bottom') => {
        if (times < 0 || !containerRef.value) { return; }

        const height = containerRef.value.clientHeight;
        let needCollectHeight = false;
        let newTargetAlign = targetAlign;

        if (height) {
          const mergedAlign = targetAlign || align;
          let stackTop = 0;
          let itemTop = 0;
          let itemBottom = 0;

          const maxLen = Math.min(data.length, index);
          for (let i = 0; i <= maxLen; i += 1) {
            const key = getKey(data[i] as Record<string, never>);
            itemTop = stackTop;
            const cacheHeight = heights.get(key);
            itemBottom = itemTop + (cacheHeight === undefined ? itemHeight : cacheHeight);
            stackTop = itemBottom;
            if (i === index && cacheHeight === undefined) {
              needCollectHeight = true;
            }
          }
          const scrollTop = containerRef.value.scrollTop;

          let targetTop: number | null = null;

          switch (mergedAlign) {
          case 'top':
            targetTop = itemTop - offset;
            break;
          case 'bottom':
            targetTop = itemBottom - height + offset;
            break;
          default: {
            const scrollBottom = scrollTop + height;
            if (itemTop < scrollTop) {
              newTargetAlign = 'top';
            } else if (itemBottom > scrollBottom) {
              newTargetAlign = 'bottom';
            }
          }
          }
          if (targetTop !== null && targetTop !== scrollTop) {
            syncScrollTop(targetTop);
          }
        }

        scroll = raf(() => {
          if (needCollectHeight) {
            collectHeight();
          }
          syncScroll(times - 1, newTargetAlign);
        });
      };

      syncScroll(3);
    }
  };
}

import { type DebouncedFunc, throttle } from 'lodash-es';
import { computed, type ComputedRef, type CSSProperties, type Ref, type SetupContext } from 'vue';
import { PaginationProps } from '../../pagination/src/pagination-types';
import { ListProps } from './list-types';

export const useList = (
  props: ListProps,
  ctx: SetupContext,
  pagination: Ref<PaginationProps>
): {
    sizeStyle: ComputedRef<CSSProperties>;
    handleScroll: DebouncedFunc<(e: UIEvent) => void>;
    currentChange: (current: number) => void;
    sizeChange: (size: number) => void;
  } => {
  const sizeStyle = computed<CSSProperties>(() => {
    if (props.size === 'sm') {
      return {
        padding: '8px 16px',
      };
    } else if (props.size === 'md') {
      return {
        padding: '12px 24px',
      };
    } else if (props.size === 'lg') {
      return {
        padding: '16px 24px',
      };
    }
    return {};
  });

  const handleScroll = throttle((e: UIEvent) => {
    const scrollTop = (e.target as HTMLElement)?.scrollTop;
    const scrollHeight = (e.target as HTMLElement)?.scrollHeight;
    const clientHeight = (e.target as HTMLElement)?.clientHeight;
    const currentHeight = scrollTop + clientHeight + Number(props.distance);
    ctx.emit('scroll', scrollTop);
    if (currentHeight >= scrollHeight) {
      ctx.emit('reach-bottom', e);
      if (props.loadMoreFn) {
        props.loadMoreFn();
      }
    }
  }, 300);

  const currentChange = (val: number) => {
    ((pagination.value as PaginationProps).pageIndex as number) = val;
    ctx.emit('page-index-change', val);
  };
  const sizeChange = (val: number) => {
    ((pagination.value as PaginationProps).pageSize as number) = val;
    ctx.emit('page-size-change', val);
  };

  return {
    sizeStyle,
    handleScroll,
    currentChange,
    sizeChange,
  };
};

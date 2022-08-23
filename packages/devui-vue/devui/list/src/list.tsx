import { computed, CSSProperties, defineComponent, provide, ref, watch } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './list.scss';
import { listProps } from './list-types';
import { listKey } from './listKey';
import { cloneDeep, throttle } from 'lodash-es';
import { PaginationProps } from '../../pagination';

export default defineComponent({
  name: 'DList',
  props: listProps,
  emits: ['scroll', 'reach-bottom', 'page-index-change', 'page-size-change'],
  setup(props, { slots, emit }) {
    const ns = useNamespace('list');
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
    const loading = computed(() => props.loading);
    const list = computed(() => cloneDeep(props.data));
    provide(listKey, {
      data: computed(() => props.data),
      split: computed(() => props.split),
      size: computed(() => props.size),
      layout: computed(() => props.layout),
      sizeStyle: sizeStyle,
    });
    const handleScroll = throttle((e: UIEvent) => {
      const scrollTop = (e.target as HTMLElement)?.scrollTop;
      const scrollHeight = (e.target as HTMLElement)?.scrollHeight;
      const clientHeight = (e.target as HTMLElement)?.clientHeight;
      const currentHeight = scrollTop + clientHeight + Number(props.distance);
      emit('scroll', scrollTop);
      if (currentHeight >= scrollHeight) {
        emit('reach-bottom', e);
        if (props.loadMoreFn) {
          props.loadMoreFn();
        }
      }
    }, 300);

    const pagination = ref<PaginationProps>();

    const currentChange = (val: number) => {
      ((pagination.value as PaginationProps).pageIndex as number) = val;
      emit('page-index-change', val);
    };
    const sizeChange = (val: number) => {
      ((pagination.value as PaginationProps).pageSize as number) = val;
      emit('page-size-change', val);
    };

    watch(
      () => props.pagination,
      (val) => {
        pagination.value = cloneDeep(val);
      },
      { deep: true, immediate: true }
    );

    return () => {
      return (
        <>
          <div
            class={`${ns.b()} ${props.bordered ? ns.m('bordered') : ''}`}
            v-d-loading={loading.value}
            style={{
              height: props.maxHeight + 'px',
              overflow: 'auto',
            }}
            onScroll={(e) => handleScroll(e)}>
            {props.header || slots.header ? (
              slots.header ? (
                <div class={ns.e('header')} style={{ ...sizeStyle.value }}>
                  {slots.header()}
                </div>
              ) : props.header ? (
                props.header
              ) : null
            ) : null}
            <div class={ns.e('container')}>
              {list.value.map((item) => {
                return slots.item?.({ item });
              })}
            </div>
            {props.footer || slots.footer ? (
              slots.footer ? (
                <div class={ns.e('footer')} style={{ ...sizeStyle.value }}>
                  {slots.footer()}
                </div>
              ) : props.footer ? (
                props.footer
              ) : null
            ) : null}
            {props.loadMore || slots.loadMore ? (
              slots.loadMore ? (
                <div class={ns.e('load')}>{props.loadMore}</div>
              ) : props.loadMore ? (
                props.loadMore
              ) : null
            ) : null}
          </div>
          {props.pagination ? (
            <div class={ns.e('pagination')}>
              <d-pagination {...pagination.value} onPageIndexChange={currentChange} onPageSizeChange={sizeChange}></d-pagination>
            </div>
          ) : null}
        </>
      );
    };
  },
});

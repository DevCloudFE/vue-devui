import { computed, defineComponent, EmitsOptions, provide, Ref, ref, SetupContext, watch } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './list.scss';
import { listProps } from './list-types';
import { listKey } from './listKey';
import { cloneDeep } from 'lodash';
import { PaginationProps, Pagination } from '../../pagination';
import { useList } from './useList';
import { LoadingDirective } from '../../loading';

export default defineComponent({
  name: 'DList',
  components: {
    Pagination,
  },
  directives: {
    Loading: LoadingDirective,
  },
  props: listProps,
  emits: ['scroll', 'reach-bottom', 'page-index-change', 'page-size-change'],
  setup(props, ctx) {
    const { slots } = ctx;
    const ns = useNamespace('list');

    const loading = computed(() => props.loading);
    const list = computed(() => cloneDeep(props.data));
    const pagination = ref<PaginationProps>();
    const { sizeStyle, handleScroll, sizeChange, currentChange } = useList(
      props,
      ctx as SetupContext<EmitsOptions>,
      pagination as Ref<PaginationProps>
    );
    provide(listKey, {
      data: computed(() => props.data),
      split: computed(() => props.split),
      size: computed(() => props.size),
      layout: computed(() => props.layout),
      sizeStyle: sizeStyle,
    });

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
            v-loading={loading.value}
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
              <Pagination {...pagination.value} onPageIndexChange={currentChange} onPageSizeChange={sizeChange}></Pagination>
            </div>
          ) : null}
        </>
      );
    };
  },
});

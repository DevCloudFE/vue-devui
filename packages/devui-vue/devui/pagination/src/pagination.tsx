import { defineComponent, computed, nextTick, toRefs, getCurrentInstance, provide } from 'vue';
import { Select } from '../../select';
import { paginationProps, PaginationProps, paginationInjectionKey } from './pagination-types';
import { liteSelectOptions } from './utils';
import ConfigMenu from './components/config-menu';
import JumpPage from './components/jump-page';
import PageNumBtn from './components/page-nums';
import PageSize from './components/page-size';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { createI18nTranslate } from '../../locale/create';
import './pagination.scss';

export default defineComponent({
  name: 'DPagination',
  components: {
    ConfigMenu,
    JumpPage,
    PageNumBtn,
  },
  props: paginationProps,
  emits: ['pageIndexChange', 'pageSizeChange', 'update:pageSize', 'update:pageIndex'],
  setup(props: PaginationProps, { emit, slots }) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DPagination', app);

    const {
      autoHide,
      pageSizeOptions,
      total,
      canChangePageSize,
      lite,
      size,
      showPageSelector,
      canViewTotal,
      totalItemText,
      maxItems,
      preLink,
      nextLink,
      showTruePageIndex,
      canJumpPage,
      goToText,
      pageIndex,
      showJumpButton,
      haveConfigMenu,
    } = toRefs(props);
    const ns = useNamespace('pagination');

    // 总页数
    const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

    // 极简模式下，可选的下拉选择页码
    const litePageOptions = computed(() => liteSelectOptions(totalPages.value));

    // 当前页码
    const cursor = computed({
      get() {
        // 是否需要修正错误的pageIndex
        if (!props.showTruePageIndex && props.pageIndex > totalPages.value) {
          emit('update:pageIndex', totalPages.value || 1);
          return totalPages.value || 1;
        }
        return props.pageIndex || 1;
      },
      set(val: number) {
        emit('update:pageIndex', val);
      },
    });

    // 每页显示最大条目数量
    const currentPageSize = computed({
      get() {
        return props.pageSize;
      },
      set(val: number) {
        emit('update:pageSize', val);
      },
    });

    const changeCursorEmit = (val: number) => {
      cursor.value = val;
      emit('pageIndexChange', val);
    };

    // 每页条数改变
    const pageSizeChange = (val: Record<string, string | number>) => {
      currentPageSize.value = val.value as number;
      // 页数改变后，如果当前页码超出最大页码时修正
      if (props.autoFixPageIndex) {
        nextTick(() => {
          if (cursor.value > totalPages.value) {
            changeCursorEmit(totalPages.value);
          }
        });
      }
      emit('pageSizeChange', val.value as number);
    };

    // 极简模式下的跳转页码
    const litePageIndexChange = (page: { name: string; value: number }) => {
      changeCursorEmit(page.value);
    };

    provide(paginationInjectionKey, { size, currentPageSize, pageSizeOptions, pageSizeChange, t });

    return () =>
      // autoHide 为 true，并且 pageSizeOptions 最小值大于 total，则不展示分页
      autoHide.value && Math.min(...pageSizeOptions.value) > total.value ? null : (
        <div class={ns.b()}>
          {
            // 切换每页数据大小的下拉框
            canChangePageSize.value && !lite.value && <PageSize />
          }
          {
            // 总页数显示
            (!lite.value || (lite.value && showPageSelector.value)) && canViewTotal.value && (
              <div class={ns.e('total-size')}>
                {totalItemText?.value || t('totalItemText')}: {total.value}
              </div>
            )
          }
          {
            // 极简模式下的选择页码下拉框
            lite.value && showPageSelector.value && (
              <Select
                options={litePageOptions.value}
                disabled={total.value === 0}
                modelValue={cursor.value}
                onValueChange={litePageIndexChange}
                size={size.value}
                style="width:100px"
              />
            )
          }

          {/* 页码展示 */}
          <page-num-btn
            {...{
              cursor: cursor.value,
              totalPages: totalPages.value,
              size: size.value,
              lite: lite.value,
              maxItems: maxItems.value,
              preLink: preLink.value,
              nextLink: nextLink.value,
              showTruePageIndex: showTruePageIndex.value,
            }}
            onChangeCursorEmit={changeCursorEmit}
          />

          {
            // 跳转页码
            canJumpPage.value && !lite.value && (
              <jump-page
                {...{
                  goToText: goToText.value || t('goToText'),
                  size: size.value,
                  pageIndex: pageIndex.value,
                  totalPages: totalPages.value,
                  cursor: cursor.value,
                  showJumpButton: showJumpButton.value,
                }}
                onChangeCursorEmit={changeCursorEmit}
              />
            )
          }
          {
            // 极简模式下是否显示配置
            lite.value && haveConfigMenu.value && (
              <config-menu
                {...{
                  currentPageSize: currentPageSize.value,
                  pageSizeChange,
                  pageSizeOptions: pageSizeOptions.value,
                }}>
                {slots.default?.()}
              </config-menu>
            )
          }
        </div>
      );
  },
});

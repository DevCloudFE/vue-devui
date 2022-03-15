import { defineComponent, computed, nextTick } from 'vue';
import { ComponentProps, componentProps } from './use-pagination';
import { liteSelectOptions } from './utils';

import ConfigMenu from './components/config-menu';
import JumpPage from './components/jump-page';
import PageNumBtn from './components/page-nums';

import './pagination.scss';

export default defineComponent({
  name: 'DPagination',
  components: {
    ConfigMenu,
    JumpPage,
    PageNumBtn
  },
  props: componentProps,
  emits: ['pageIndexChange', 'pageSizeChange', 'update:pageSize', 'update:pageIndex'],
  setup(props: ComponentProps, { emit }) {

    // 极简模式下，可选的下拉选择页码
    const litePageOptions = computed(() =>  liteSelectOptions(totalPages.value));

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
      }
    });
    // 每页显示最大条目数量
    const currentPageSize = computed({
      get() {
        return props.pageSize;
      },
      set(val: number) {
        emit('update:pageSize', val);
      }
    });
    // 总页数
    const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

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
    const litePageIndexChange = (page: {name: string; value: number}) => {
      changeCursorEmit(page.value);
    };

    return {
      cursor,
      totalPages,
      changeCursorEmit,
      currentPageSize,
      pageSizeChange,
      litePageOptions,
      litePageIndexChange
    };
  },
  render() {

    const {
      total,
      pageIndex,
      pageSizeOptions,
      pageSizeDirection,
      preLink,
      nextLink,
      size,
      canJumpPage,
      canChangePageSize,
      canViewTotal,
      totalItemText,
      goToText,
      maxItems,
      showJumpButton,
      showTruePageIndex,
      lite,
      showPageSelector,
      haveConfigMenu,
      autoHide,
      $slots,

      cursor,
      totalPages,
      currentPageSize,
      pageSizeChange,
      changeCursorEmit,
      litePageOptions,
      litePageIndexChange
    } = this;

    return (
      // autoHide为 true 并且 pageSizeOptions最小值 > total 不展示分页
      autoHide && Math.min(...pageSizeOptions) > total
        ? null
        : <div class="devui-pagination">
          {
            canChangePageSize && !lite &&
          <div class={['devui-page-size', size ? 'devui-page-size-' + size : '']}>
            <d-select
              options={pageSizeOptions}
              modelValue={currentPageSize}
              onValueChange={pageSizeChange}
              pageSizeDirection={pageSizeDirection}
            />
          </div>
          }
          {
          // 总页数显示
            ((!lite || (lite && showPageSelector)) && canViewTotal) &&
          <div class="devui-total-size">{totalItemText}: {total}</div>
          }
          {
          // 极简模式下的选择页码下拉框
            lite && showPageSelector &&
          <div class="devui-page-size">
            <d-select
              options={litePageOptions}
              disabled={total === 0}
              modelValue={cursor}
              onValueChange={litePageIndexChange}
              pageSizeDirection={pageSizeDirection}
            />
          </div>
          }

          {/* 页码展示 */}
          <page-num-btn
            {...{
              cursor,
              totalPages,
              size,
              lite,
              maxItems,
              preLink,
              nextLink,
              showTruePageIndex
            }}
            onChangeCursorEmit={changeCursorEmit}
          />

          {
          // 跳转页码
            canJumpPage && !lite &&
          <jump-page
            {...{
              goToText,
              size,
              pageIndex,
              totalPages,
              cursor,
              showJumpButton
            }}
            onChangeCursorEmit={changeCursorEmit}
          />
          }
          {
          // 极简模式下是否显示配置
            lite && haveConfigMenu &&
          <config-menu
            {...{
              currentPageSize,
              pageSizeChange,
              pageSizeOptions
            }}
          >
            {$slots.default?.()}
          </config-menu>
          }
        </div>
    );
  }
});

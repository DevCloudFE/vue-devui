import { defineComponent, provide, toRefs, ref } from 'vue';
import type { SetupContext } from 'vue';
import FixHeadGrid from './components/fix-head-grid';
import NormalHeadGrid from './components/normal-head-grid';
import { dataGridProps, DataGridInjectionKey } from './data-grid-types';
import type { DataGridProps } from './data-grid-types';
import { useDataGrid, useDataGridStyle } from './composables/use-data-grid';
import './data-grid.scss';

export default defineComponent({
  name: 'DDataGrid',
  props: dataGridProps,
  emits: [
    'loadMore',
    'sortChange',
    'checkChange',
    'checkAllChange',
    'expandChange',
    'expandAllChange',
    'rowClick',
    'cellClick',
    'resizeStart',
    'resizing',
    'resizeEnd',
    'expandLoadMore',
  ],
  setup(props: DataGridProps, ctx: SetupContext) {
    const { fixHeader, showHeader, lazy, rowClass, cellClass, size, indent, virtualScroll, columnVirtualScroll, resizable } = toRefs(props);
    const rootRef = ref<HTMLElement>();
    const {
      scrollRef,
      headBoxRef,
      bodyScrollLeft,
      bodyContentHeight,
      bodyContentWidth,
      translateX,
      translateY,
      renderFixedLeftColumnData,
      renderFixedRightColumnData,
      renderColumnData,
      renderRowData,
      isTreeGrid,
      allChecked,
      halfAllChecked,
      sort,
      getCheckedRows,
      execSortMethod,
      addGridThContextToMap,
      clearAllSortState,
      toggleRowExpansion,
      toggleAllRowExpansion,
      toggleRowChecked,
      toggleAllRowChecked,
      afterColumnDragend,
      refreshRowsData,
    } = useDataGrid(props, ctx);
    const { gridClasses } = useDataGridStyle(props, scrollRef);

    provide(DataGridInjectionKey, {
      rowClass,
      cellClass,
      size,
      fixHeader,
      showHeader,
      lazy,
      indent,
      virtualScroll,
      columnVirtualScroll,
      resizable,
      bodyContentWidth,
      bodyContentHeight,
      translateX,
      translateY,
      bodyScrollLeft,
      renderColumnData,
      renderFixedLeftColumnData,
      renderFixedRightColumnData,
      renderRowData,
      rootRef,
      scrollRef,
      headBoxRef,
      rootCtx: ctx,
      isTreeGrid,
      allChecked,
      halfAllChecked,
      execSortMethod,
      addGridThContextToMap,
      clearAllSortState,
      toggleRowExpansion,
      toggleRowChecked,
      toggleAllRowChecked,
      afterColumnDragend,
    });

    ctx.expose({ sort, toggleRowChecked, toggleAllRowChecked, getCheckedRows, toggleRowExpansion, toggleAllRowExpansion, refreshRowsData });

    return () => (
      <div ref={rootRef}>
        {fixHeader.value ? (
          <FixHeadGrid class={gridClasses.value} />
        ) : (
          <NormalHeadGrid class={[gridClasses.value, 'devui-scroll-overlay']} />
        )}
      </div>
    );
  },
});

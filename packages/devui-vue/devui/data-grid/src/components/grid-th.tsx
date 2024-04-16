import { defineComponent, toRefs, inject, computed } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { Checkbox } from '../../../checkbox';
import { SortIcon } from './grid-icons';
import GridThFilter from './grid-th-filter';
import { gridThProps, DataGridInjectionKey } from '../data-grid-types';
import type { GridThProps, DataGridContext } from '../data-grid-types';
import { useGridThSort, useGridThFilter, useGridThDrag } from '../composables/use-grid-th';

export default defineComponent({
  name: 'GridTh',
  props: gridThProps,
  setup(props: GridThProps) {
    const ns = useNamespace('data-grid');
    const { size, allChecked, halfAllChecked, virtualScroll, columnVirtualScroll, resizable, addGridThContextToMap, toggleAllRowChecked } =
      inject(DataGridInjectionKey) as DataGridContext;
    const { columnConfig, mouseenterCb, mouseleaveCb } = toRefs(props);
    const { direction, doSort, onSortClick, doClearSort } = useGridThSort(columnConfig);
    const { filterActive, setFilterStatus, onFilterChange } = useGridThFilter(columnConfig);
    const classes = computed(() => ({
      [ns.e('th')]: true,
      [ns.m(columnConfig.value.align)]: true,
      [ns.e('sticky-th')]: true,
      [ns.em('th', size.value)]: true,
      [ns.em('th', 'filter-active')]: filterActive.value,
      [ns.em('th', 'sort-active')]: Boolean(direction.value),
      [ns.em('th', 'operable')]:
        columnConfig.value.filterable ||
        columnConfig.value.sortable ||
        (!(columnVirtualScroll.value ?? virtualScroll.value) && (columnConfig.value.resizable ?? resizable.value)),
    }));
    const { thRef, onMousedown } = useGridThDrag(columnConfig);

    if (columnConfig.value.sortable) {
      addGridThContextToMap(columnConfig.value.field, { doSort, doClearSort });
    }

    const cellTypeMap = {
      checkable: () => <Checkbox modelValue={allChecked.value} halfChecked={halfAllChecked.value} onChange={toggleAllRowChecked} />,
      index: () => <span class={ns.em('th', 'index')}>#</span>,
      default: () => <span class="th-title">{columnConfig.value.header}</span>,
    };

    return () => (
      <div
        ref={thRef}
        class={classes.value}
        style={{ width: columnConfig.value.width + 'px' }}
        onMousedown={onMousedown}
        onMouseenter={(e) => mouseenterCb.value(e, columnConfig.value.showHeadOverflowTooltip)}
        onMouseleave={(e) => mouseleaveCb.value(e, columnConfig.value.showHeadOverflowTooltip)}>
        {columnConfig.value.headRender ? (
          <span class="th-title">{columnConfig.value.headRender(columnConfig.value)}</span>
        ) : (
          cellTypeMap[columnConfig.value.type || 'default']()
        )}
        {columnConfig.value.sortable && (
          <SortIcon
            class={['th-sort-icon', direction.value, { 'th-sort-default-visible': columnConfig.value.showSortIcon }]}
            onClick={onSortClick}
          />
        )}
        {columnConfig.value.filterable && (
          <GridThFilter
            filterList={columnConfig.value.filterList}
            multiple={columnConfig.value.filterMultiple}
            showFilterIcon={columnConfig.value.showFilterIcon}
            filterMenu={columnConfig.value.filterMenu}
            setFilterStatus={setFilterStatus}
            onFilterChange={onFilterChange}
          />
        )}
        {!(columnVirtualScroll.value ?? virtualScroll.value) && (columnConfig.value.resizable ?? resizable.value) && (
          <span class="resize-handle"></span>
        )}
      </div>
    );
  },
});

import { defineComponent, inject, toRefs, ref } from 'vue';
import { TABLE_TOKEN, ITableInstanceAndDefaultRow } from '../../table-types';
import Sort from '../sort/sort';
import Filter from '../filter/filter';
import { useFixedColumn } from '../../composables/use-table';
import { useBaseRender, useSort, useFilter, useDragColumnWidth } from './use-header-th';
import { headerThProps, HeaderThProps } from './header-th-types';

export default defineComponent({
  name: 'DTableHeaderTh',
  props: headerThProps,
  setup(props: HeaderThProps, { expose }) {
    const table = inject(TABLE_TOKEN) as ITableInstanceAndDefaultRow;
    const store = table.store;
    const headerContainerRef = ref();
    const { column, colspan, rowspan } = toRefs(props);
    const { baseClass } = useBaseRender(column);
    const { direction, sortClass, handleSort, clearSortOrder } = useSort(column);
    const { filterClass, handleFilter } = useFilter(column);
    const { stickyClass, stickyStyle } = useFixedColumn(column);
    const { resizing, dragClass, onMousedown } = useDragColumnWidth(headerContainerRef, column);

    expose({ clearSortOrder });
    return () => (
      <th
        class={[baseClass.value, stickyClass.value, sortClass.value, filterClass.value, dragClass.value]}
        style={stickyStyle.value}
        colspan={colspan?.value}
        rowspan={rowspan?.value}
      >
        <div ref={headerContainerRef} class="header-container" onMousedown={onMousedown}>
          {column.value.renderHeader?.(column.value, store)}
          {column.value.filterable && (
            <Filter filterList={column.value.filterList} multiple={column.value.filterMultiple} onFilter={handleFilter} />
          )}
          {column.value.sortable && <Sort sort-direction={direction.value} onSort={handleSort} />}
          {column.value.resizeable && <span class="resize-handle" onClick={(e) => e.stopPropagation()}></span>}
          {column.value.resizeable && resizing.value && <div class="resize-overlay" onClick={(e) => e.stopPropagation()}></div>}
        </div>
      </th>
    );
  },
});

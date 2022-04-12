import { defineComponent, inject, toRefs } from 'vue';
import type { PropType } from 'vue';
import { Column } from '../column/column-types';
import { TABLE_TOKEN } from '../../table-types';
import Sort from '../sort/sort';
import { Filter } from '../filter';
import { useFixedColumn } from '../../composables/use-table';
import { useSort, useFilter } from './use-header-th';

export default defineComponent({
  name: 'DTableHeaderTh',
  props: {
    column: {
      type: Object as PropType<Column>,
      required: true,
    },
  },
  setup(props: { column: Column }, { expose }) {
    const table = inject(TABLE_TOKEN);
    const store = table.store;
    const { column } = toRefs(props);
    const { direction, sortClass, handleSort, clearSortOrder } = useSort(column);
    const filteredRef = useFilter(store, column);
    const { stickyClass, stickyStyle } = useFixedColumn(column);

    expose({ clearSortOrder });

    return () => (
      <th class={[stickyClass.value, sortClass.value]} style={stickyStyle.value}>
        <div class="header-container">
          {column.value.renderHeader?.(column.value, store)}
          {column.value.filterable && (
            <Filter v-model={filteredRef.value} filterList={props.column.filterList} customTemplate={props.column.customFilterTemplate} />
          )}
          {column.value.sortable && <Sort sort-direction={direction.value} onSort={handleSort} />}
        </div>
      </th>
    );
  },
});

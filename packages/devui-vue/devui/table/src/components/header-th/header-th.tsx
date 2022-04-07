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
  setup(props: { column: Column }) {
    const table = inject(TABLE_TOKEN);
    const { column } = toRefs(props);
    const { direction, sortClass } = useSort(table.store, column);
    const filteredRef = useFilter(table.store, column);
    const { stickyClass, stickyStyle } = useFixedColumn(column);

    return () => (
      <th class={[stickyClass.value, sortClass.value]} style={stickyStyle.value}>
        <div class="header-container">
          {column.value.renderHeader?.(column.value, table.store)}
          {column.value.filterable && (
            <Filter v-model={filteredRef.value} filterList={props.column.filterList} customTemplate={props.column.customFilterTemplate} />
          )}
          {column.value.sortable && <Sort v-model={direction.value} />}
        </div>
      </th>
    );
  },
});

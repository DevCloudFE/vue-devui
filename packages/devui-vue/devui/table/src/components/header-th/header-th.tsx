import { defineComponent, inject, toRefs } from 'vue';
import type { PropType } from 'vue';
import { Column } from '../column/column-types';
import { TABLE_TOKEN } from '../../table-types';
import { Sort } from '../sort';
import { Filter } from '../filter';
import { useFixedColumn } from '../../composable/use-table';
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
    const directionRef = useSort(table.store, column);
    const filteredRef = useFilter(table.store, column);
    const { stickyClass, stickyStyle } = useFixedColumn(column);

    return () => (
      <th class={stickyClass.value} style={stickyStyle.value}>
        <div class="header-container">
          {props.column.renderHeader?.(column.value, table.store)}
          {props.column.filterable && (
            <Filter v-model={filteredRef.value} filterList={props.column.filterList} customTemplate={props.column.customFilterTemplate} />
          )}
        </div>
        {props.column.sortable && <Sort v-model={directionRef.value} />}
      </th>
    );
  },
});

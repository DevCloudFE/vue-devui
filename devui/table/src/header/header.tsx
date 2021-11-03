import { defineComponent, inject, computed, ref, PropType, watch } from 'vue';
import { TableHeaderProps, TableHeaderPropsTypes } from './header.type'
import { SortDirection, TABLE_TOKEN } from '../table.type';
import { Column } from '../column/column.type';

import { Checkbox } from '../../../checkbox';
import { Sort } from './sort';

import './header.scss';


export default defineComponent({
  name: 'DTableHeader',
  props: TableHeaderProps,
  setup(props: TableHeaderPropsTypes) {
    const table = inject(TABLE_TOKEN);
    const { _checkAll: checkAll, _halfChecked: halfChecked } = table.store.states;

    const checkbox = computed(() => {
      return table.props.checkable ? (
        <th>
          <Checkbox v-model={checkAll.value} halfchecked={halfChecked.value} />
        </th>
      ) : null
    });

    return () => {
      const columns = props.store.states._columns;
      return (
        <thead class="devui-thead">
          <tr>
            {checkbox.value}
            {columns.value.map((column, index) => (
              <Th key={index} column={column} />
            ))}
          </tr>
        </thead>
      )
    }
  }
});

const Th = defineComponent({
  props: {
    column: {
      type: Object as PropType<Column>,
      required: true
    }
  },
  setup(props: { column: Column; }) {
    const directionRef = ref<SortDirection>('DESC');
    const { sortData } = inject(TABLE_TOKEN).store;
    watch([directionRef, () => props.column], ([direction, column]) => {
      if (props.column.sortable) {
        sortData(column.field, direction, column.compareFn);
      }
    }, { immediate: true });
    return () => (
      <th style="position: relative">
        {props.column.renderHeader()}
        {props.column.sortable && <Sort v-model={directionRef.value} />}
      </th>
    )
  }
});
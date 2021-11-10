import { defineComponent, inject, computed, ref, shallowRef, PropType, watch } from 'vue';
import { TableHeaderPropsTypes } from './header.type'
import { SortDirection, TABLE_TOKEN } from '../table.type';
import { Column, FilterResults } from '../column/column.type';

import { Checkbox } from '../../../checkbox';
import { Sort } from './sort';
import { Filter } from './filter';

import './header.scss';


export default defineComponent({
  name: 'DTableHeader',
  setup() {
    const table = inject(TABLE_TOKEN);
    const {
      _checkAll: checkAll,
      _halfChecked: halfChecked,
      _columns: columns
    } = table.store.states;

    const checkbox = computed(() => {
      return table.props.checkable ? (
        <th>
          <Checkbox
            v-model={checkAll.value}
            halfchecked={halfChecked.value}
          />
        </th>
      ) : null
    });

    return () => {
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
    // 排序功能
    const directionRef = ref<SortDirection>('DESC');
    const { sortData, filterData } = inject(TABLE_TOKEN).store;
    watch([directionRef, () => props.column], ([direction, column]) => {
      if (props.column.sortable) {
        sortData(column.field, direction, column.compareFn);
      }
    }, { immediate: true });

    // 过滤器
    const filteredRef = shallowRef<FilterResults>();
    watch(filteredRef, (results) => {
      filterData(props.column.field, results);
    });

    return () => (
      <th style="position: relative">
        {props.column.renderHeader()}
        {props.column.sortable && <Sort v-model={directionRef.value} />}
        {props.column.filterable && <Filter
          v-model={filteredRef.value}
          filterList={props.column.filterList}
          customTemplate={props.column.customFilterTemplate}
        />}
      </th>
    )
  }
});
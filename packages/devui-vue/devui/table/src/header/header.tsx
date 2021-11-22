import { defineComponent, inject, computed, ref, shallowRef, PropType, watch, toRefs } from 'vue';
import { TABLE_TOKEN } from '../table.type';
import { Column, FilterResults } from '../column/column.type';

import { Checkbox } from '../../../checkbox';
import { Sort } from './sort';
import { Filter } from './filter';

import './header.scss';
import '../body/body.scss';
import { useFliter, useSort } from './use-header';


export default defineComponent({
  name: 'DTableHeader',
  setup() {
    const table = inject(TABLE_TOKEN);
    const {
      _checkAll: checkAll,
      _halfChecked: halfChecked,
      _columns: columns
    } = table.store.states;

    const checkbox = computed(() => table.props.checkable ? (
      <th class="devui-sticky-cell" style="left:0;">
        <Checkbox
          style="padding:10px;"
          v-model={checkAll.value}
          halfchecked={halfChecked.value}
        />
      </th>
    ) : null);

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
    const table = inject(TABLE_TOKEN);
    const { column } = toRefs(props);

    // 排序功能
    const directionRef = useSort(table.store, column);

    // 过滤器
    const filteredRef = useFliter(table.store, column);

    return () => (
      <th>
        <div class="header-container">
          {props.column.renderHeader()}
          {props.column.filterable && <Filter
            v-model={filteredRef.value}
            filterList={props.column.filterList}
            customTemplate={props.column.customFilterTemplate}
          />}
        </div>
        {props.column.sortable && <Sort v-model={directionRef.value} />}
      </th>
    )
  }
});
import { defineComponent, inject, computed, PropType, toRefs } from 'vue';
import { TABLE_TOKEN } from '../../table-types';
import { Column } from '../column/column-types';
import { Checkbox } from '../../../../checkbox';
import { Sort } from '../sort';
import { Filter } from '../filter';
import { useFliter, useSort } from './use-header';
import { useFixedColumn } from '../../composable/use-table';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import './header.scss';
import '../body/body.scss';

export default defineComponent({
  name: 'DTableHeader',
  setup() {
    const table = inject(TABLE_TOKEN);
    const { _checkAll: checkAll, _halfChecked: halfChecked, _columns: columns, isFixedLeft } = table.store.states;
    const ns = useNamespace('table');

    const thAttrs = computed(() =>
      isFixedLeft.value
        ? {
            class: `${ns.m('sticky-cell')} left`,
            style: 'left:0;',
          }
        : null
    );
    const checkbox = computed(() =>
      table.props.checkable ? (
        <th {...thAttrs.value}>
          <Checkbox style="padding:10px;" v-model={checkAll.value} halfchecked={halfChecked.value} />
        </th>
      ) : null
    );

    return () => {
      return (
        <thead class={ns.e('thead')}>
          <tr>
            {checkbox.value}
            {columns.value.map((column, index) => (
              <Th key={index} column={column} />
            ))}
          </tr>
        </thead>
      );
    };
  },
});

const Th = defineComponent({
  props: {
    column: {
      type: Object as PropType<Column>,
      required: true,
    },
  },
  setup(props: { column: Column }) {
    const table = inject(TABLE_TOKEN);
    const { column } = toRefs(props);

    // 排序功能
    const directionRef = useSort(table.store, column);

    // 过滤器
    const filteredRef = useFliter(table.store, column);

    // 固定列功能
    const { stickyCell, offsetStyle } = useFixedColumn(column);

    return () => (
      <th class={stickyCell.value} style={offsetStyle.value}>
        <div class="header-container">
          {props.column.renderHeader()}
          {props.column.filterable && (
            <Filter v-model={filteredRef.value} filterList={props.column.filterList} customTemplate={props.column.customFilterTemplate} />
          )}
        </div>
        {props.column.sortable && <Sort v-model={directionRef.value} />}
      </th>
    );
  },
});

import {
  inject,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  toRefs,
  watch,
  ref,
  getCurrentInstance,
  onBeforeMount,
  SetupContext,
} from 'vue';
import { isFunction } from 'lodash';
import { tableColumnProps, TableColumnProps, TableColumn } from './column-types';
import { TABLE_TOKEN, Table, DefaultRow } from '../../table-types';
import { createColumn, useRender } from './use-column';

let columnIdInit = 1;

export default defineComponent({
  name: 'DColumn',
  props: tableColumnProps,
  emits: ['filter-change'],
  setup(props: TableColumnProps, ctx: SetupContext) {
    const instance = getCurrentInstance() as TableColumn;
    const column = createColumn(toRefs(props), ctx.slots);
    const owner = inject(TABLE_TOKEN) as Table<DefaultRow>;
    const isSubColumn = ref(false);
    let columnId = '';
    const { columnOrTableParent, getColumnIndex } = useRender();
    const parent: any = columnOrTableParent.value;
    columnId = `${parent.tableId || parent.columnId}_column_${columnIdInit++}`;
    column.ctx = ctx;

    onBeforeMount(() => {
      isSubColumn.value = owner !== parent;
      column.id = columnId;
    });

    onMounted(() => {
      const children = isSubColumn.value ? parent.vnode.el.children : owner?.hiddenColumns.value?.children;
      const columnIndex = getColumnIndex(children || [], instance.vnode.el);
      columnIndex > -1 && owner?.store.insertColumn(column, isSubColumn.value ? parent.columnConfig : null);

      // 行勾选控制
      if (isFunction(props.checkable)) {
        owner?.store.states._data.value.forEach((row, rowIndex) => {
          owner.store.states._checkList.value[rowIndex] = props.checkable(row, rowIndex);
        });
      }
    });

    watch(
      () => column.order,
      () => {
        owner?.store.sortColumn();
      }
    );

    onBeforeUnmount(() => {
      owner?.store.removeColumn(column);
    });

    instance.columnId = columnId;
    instance.columnConfig = column;

    return () => {
      const defaultSlot = ctx.slots.default?.({
        row: {},
        column: {},
        $index: -1,
      });

      return <div>
        {
          Array.isArray(defaultSlot)
            ? defaultSlot.filter(child => child.type.name === 'DColumn').map(child => <>{child}</>)
            : <div></div>
        }
      </div>;
    };
  }
});

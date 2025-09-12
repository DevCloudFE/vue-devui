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
  h,
} from 'vue';
import type { VNode } from 'vue';
import { tableColumnProps, TableColumnProps, TableColumn } from './column-types';
import { TABLE_TOKEN, ITableInstanceAndDefaultRow } from '../../table-types';
import { createColumn, useRender } from './use-column';

let columnIdInit = 1;

export default defineComponent({
  name: 'DColumn',
  props: tableColumnProps,
  emits: ['filter-change', 'resize-start', 'resizing', 'resize-end'],
  setup(props: TableColumnProps, ctx: SetupContext) {
    const owner = inject(TABLE_TOKEN) as ITableInstanceAndDefaultRow;
    const isSubColumn = ref(false);
    const { columnOrTableParent, getColumnIndex } = useRender();
    const parent = columnOrTableParent.value as TableColumn & ITableInstanceAndDefaultRow;

    const instance = getCurrentInstance() as TableColumn;
    instance.columnId = `${parent.tableId || parent.columnId}_column_${columnIdInit++}`;

    // 构造 column
    const column = createColumn(instance.columnId, toRefs(props), ctx);

    instance.columnConfig = column;

    onBeforeMount(() => {
      isSubColumn.value = owner !== parent;
    });

    onMounted(() => {
      const children = isSubColumn.value ? parent?.vnode?.el?.children : owner?.hiddenColumns.value?.children;
      const columnIndex = getColumnIndex(children || [], instance.vnode.el);
      columnIndex > -1 && owner?.store.insertColumn(column, isSubColumn.value ? parent.columnConfig : null);

      // 行勾选控制
      if (typeof props.checkable === 'function') {
        for (const [rowIndex, row] of owner?.store.states._data.value.entries()) {
          if (props.checkable(row, rowIndex)) {
            owner.store.checkRow(true, row);
          }
        }
      }
    });

    watch(
      () => column.order,
      () => {
        owner?.store.sortColumn();
      }
    );

    // 勾选状态保留
    // watch(owner?.store.states._data, () => {
    //   if (reserveCheck.value) {
    //     for (const [rowIndex, row] of owner?.store.states._data.value.entries()) {
    //       if (props.checkable(row, rowIndex)) {
    //         owner.store.checkRow(, row);
    //       }
    //     }
    //   }
    // });

    onBeforeUnmount(() => {
      owner?.store.removeColumn(column);
    });

    return () => {
      try {
        const defaultSlot = ctx.slots.default?.({
          row: {},
          column: {},
          $index: -1,
        });

        return (
          <div>
            {defaultSlot && Array.isArray(defaultSlot) ? (
              defaultSlot
                .filter((child) => (child.type as VNode['type'] & { name: string }).name === 'DColumn')
                .map((child) => <>{child}</>)
            ) : (
              <div />
            )}
          </div>
        );
      } catch {
        return h('div', []);
      }
    };
  },
});

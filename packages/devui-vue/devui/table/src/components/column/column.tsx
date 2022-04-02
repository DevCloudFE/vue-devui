import { inject, defineComponent, onBeforeUnmount, onMounted, toRefs, watch, ref, getCurrentInstance, onBeforeMount, h } from 'vue';
import { tableColumnProps, TableColumnProps, TableColumn } from './column-types';
import { TABLE_TOKEN, Table, DefaultRow } from '../../table-types';
import { createColumn, useRender } from './use-column';

let columnIdInit = 1;

export default defineComponent({
  name: 'DColumn',
  props: tableColumnProps,
  setup(props: TableColumnProps, ctx) {
    const instance = getCurrentInstance() as TableColumn;
    const column = createColumn(toRefs(props), ctx.slots);
    const owner = inject(TABLE_TOKEN) as Table<DefaultRow>;
    const isSubColumn = ref(false);
    let columnId = '';
    const { columnOrTableParent, getColumnIndex } = useRender();
    const parent: any = columnOrTableParent.value;
    columnId = `${parent.tableId || parent.columnId}_column_${columnIdInit++}`;

    onBeforeMount(() => {
      isSubColumn.value = owner !== parent;
      column.id = columnId;
    });

    onMounted(() => {
      const children = isSubColumn.value ? parent.vnode.el.children : owner?.hiddenColumns.value?.children;
      const columnIndex = getColumnIndex(children || [], instance.vnode.el);
      columnIndex > -1 && owner?.store.insertColumn(column, isSubColumn.value ? parent.columnConfig : null);
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
  },
  render() {
    try {
      const renderDefault = this.$slots.default?.({
        row: {},
        column: {},
        $index: -1,
      });
      const children = [];
      if (Array.isArray(renderDefault)) {
        for (const childNode of renderDefault) {
          if (childNode.type.name === 'DColumn') {
            children.push(childNode);
          }
        }
      }
      const vnode = h('div', children);
      return vnode;
    } catch {
      return h('div', []);
    }
  },
});

import { provide, defineComponent, getCurrentInstance, computed, toRef, ref, onMounted, nextTick } from 'vue';
import { Table, TableProps, TablePropsTypes, TABLE_TOKEN, DefaultRow } from './table-types';
import { useTable, useTableLayout } from './composables/use-table';
import { createStore } from './store';
import FixHeader from './components/fix-header';
import NormalHeader from './components/normal-header';
import { Loading } from '../../loading';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './table.scss';

let tableIdInit = 1;

export default defineComponent({
  name: 'DTable',
  directives: {
    dLoading: Loading,
  },
  props: TableProps,
  emits: ['sort-change', 'cell-click', 'check-change', 'check-all-change', 'expand-change'],
  setup(props: TablePropsTypes, ctx) {
    const table = getCurrentInstance() as Table<DefaultRow>;
    const store = createStore(toRef(props, 'data'), table);
    const tableId = `devui-table_${tableIdInit++}`;
    const tableRef = ref();
    table.tableId = tableId;
    table.store = store;
    provide(TABLE_TOKEN, table);
    const { tableWidth, updateColumnWidth } = useTableLayout(table);
    const { classes, styles } = useTable(props, tableWidth);
    const isEmpty = computed(() => props.data.length === 0);
    const ns = useNamespace('table');
    const hiddenColumns = ref(null);
    table.hiddenColumns = hiddenColumns;
    table.tableRef = tableRef;
    table.updateColumnWidth = updateColumnWidth;

    ctx.expose({
      store
    });

    onMounted(async () => {
      await nextTick();
      store.updateColumns();
      updateColumnWidth();
    });

    return () => (
      <div ref={tableRef} class={ns.b()} style={styles.value} v-dLoading={props.showLoading}>
        <div ref={hiddenColumns} class="hidden-columns">
          {ctx.slots.default?.()}
        </div>
        {props.fixHeader ? (
          <FixHeader classes={classes.value} is-empty={isEmpty.value} />
        ) : (
          <NormalHeader classes={classes.value} is-empty={isEmpty.value} />
        )}
        {isEmpty.value && <div class={ns.e('empty')}>{ctx.slots.empty ? ctx.slots.empty() : props.empty}</div>}
      </div>
    );
  },
});

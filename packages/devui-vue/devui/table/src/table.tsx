import { provide, defineComponent, getCurrentInstance, computed, toRef, ref, onMounted, nextTick, withModifiers } from 'vue';
import type { SetupContext } from 'vue';
import { tableProps, TableProps, TABLE_TOKEN, ITableInstanceAndDefaultRow } from './table-types';
import { useTable, useTableLayout, useTableWatcher } from './composables/use-table';
import { useHorizontalScroll } from './composables/use-horizontal-scroll';
import { createStore } from './store';
import FixHeader from './components/fix-header';
import NormalHeader from './components/normal-header';
import { LoadingDirective } from '../../loading';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './table.scss';

let tableIdInit = 1;

export default defineComponent({
  name: 'DTable',
  directives: {
    Loading: LoadingDirective,
  },
  props: tableProps,
  emits: ['sort-change', 'cell-click', 'row-click', 'check-change', 'check-all-change', 'expand-change', 'load-more'],
  setup(props: TableProps, ctx: SetupContext) {
    const table = getCurrentInstance() as ITableInstanceAndDefaultRow;
    const store = createStore(toRef(props, 'data'), table, ctx);
    const tableId = `devui-table_${tableIdInit++}`;
    const tableRef = ref();
    table.tableId = tableId;
    table.store = store;
    provide<ITableInstanceAndDefaultRow>(TABLE_TOKEN, table);
    const { tableWidth, updateColumnWidth } = useTableLayout(table);
    const { classes, styles } = useTable(props, tableWidth);
    const { onTableScroll } = useHorizontalScroll(table);
    useTableWatcher(props, store);
    const isEmpty = computed(() => props.data.length === 0);
    const ns = useNamespace('table');
    const hiddenColumns = ref(null);
    table.hiddenColumns = hiddenColumns;
    table.tableRef = tableRef;
    table.updateColumnWidth = updateColumnWidth;

    ctx.expose({
      store,
    });

    onMounted(async () => {
      await nextTick();
      store.updateColumns();
      store.updateFirstDefaultColumn();
      store.updateRows();
      updateColumnWidth();
      window.addEventListener('resize', updateColumnWidth);
    });

    return () => (
      <div
        ref={tableRef}
        class={ns.b()}
        style={styles.value}
        v-loading={props.showLoading}
        onScroll={withModifiers(onTableScroll, ['stop'])}>
        <div class={ns.e('container')}>
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
      </div>
    );
  },
});

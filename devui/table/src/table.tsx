import { provide, defineComponent, getCurrentInstance, computed, toRef } from 'vue';
import { Table, TableProps, TablePropsTypes } from './table.type';
import { useTable } from './use-table';
import { createStore } from './store';
import ColGroup from './colgroup/colgroup';
import TableHeader from './header/header';
import TableBody from './body/body';
import './table.scss';

export default defineComponent({
  name: 'DTable',
  props: TableProps,
  setup(props: TablePropsTypes, ctx) {
    const table = getCurrentInstance() as Table;
    const store = createStore(toRef(props, 'data'));
    table.store = store;
    provide('table', table);

    const { classes, style } = useTable(props);

    const isEmpty = computed(() => props.data.length === 0);

    return () => (
      <div class="devui-table-wrapper" style={style.value}>
        {ctx.slots.default()}
        <table class={classes.value} cellpadding="0" cellspacing="0">
          <ColGroup />
          <TableHeader store={store} />
          {!isEmpty.value && <TableBody store={store} />}
        </table>
        {isEmpty.value && <div class="devui-table-empty">No Data</div>}
      </div>
    );
  }
});

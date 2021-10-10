import { provide, defineComponent, getCurrentInstance } from 'vue';
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
  setup(props: TablePropsTypes) {
    const table = getCurrentInstance() as Table;
    const store = createStore(props);
    table.store = store;
    const { classes } = useTable(props);
    provide('table', table);

    return { classes, store };
  },
  render() {
    const { classes, data, store, $slots } = this;
    return (
      <div class="devui-table-wrapper">
        {$slots.default()}
        <table class={classes} cellpadding="0" cellspacing="0">
          <ColGroup />
          <TableHeader store={store} />
          {!!data.length && <TableBody store={store} />}
        </table>
        {!data.length && <div class="devui-table-empty">No Data</div>}
      </div>
    );
  },
});

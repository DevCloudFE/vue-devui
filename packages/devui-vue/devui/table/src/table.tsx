import { provide, defineComponent, getCurrentInstance, computed, toRef, defineExpose } from 'vue';
import { Table, TableProps, TablePropsTypes, TABLE_TOKEN } from './table.type';
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
    provide(TABLE_TOKEN, table);

    const { classes, style } = useTable(props);

    const isEmpty = computed(() => props.data.length === 0);

    const fixHeaderCompo = computed(() => {
      return (
        <div class="devui-table-view">
          <div style="overflow: hidden scroll;">
            <table class={classes.value} cellpadding="0" cellspacing="0">
              <ColGroup />
              <TableHeader store={store} />
            </table>
          </div>
          <div class="scroll-view">
            <table class={classes.value} cellpadding="0" cellspacing="0">
              <ColGroup />
              {!isEmpty.value && <TableBody store={store} style="flex: 1" />}
            </table>
          </div>
        </div>
      );
    });

    const normalHeaderCompo = computed(() => {
      return (
        <table class={classes.value} cellpadding="0" cellspacing="0">
          <ColGroup />
          <TableHeader store={store} style={{ position: 'relative' }} />
          {!isEmpty.value && <TableBody store={store} />}
        </table>
      )
    });

    ctx.expose({
      getCheckedRows() {
        return store.getCheckedRows();
      }
    });

    return () => (
      <div class="devui-table-wrapper" style={style.value} v-dLoading={props.showLoading}>

        {ctx.slots.default()}
        {props.fixHeader ? fixHeaderCompo.value : normalHeaderCompo.value}
        {isEmpty.value && <div class="devui-table-empty">No Data</div>}
      </div>
    );
  }
});

import { provide, defineComponent, getCurrentInstance, computed, toRef } from 'vue';
import { Table, TableProps, TablePropsTypes, TABLE_TOKEN } from './table.type';
import { useTable } from './use-table';
import { createStore } from './store';
import FixHeader from './fix-header';
import NormalHeader from './normal-header';
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

    ctx.expose({
      getCheckedRows() {
        return store.getCheckedRows();
      },
    });

    return () => (
      <div class='devui-table-wrapper' style={style.value} v-dLoading={props.showLoading}>
        {ctx.slots.default()}
        {props.fixHeader ? (
          <FixHeader classes={classes.value} is-empty={isEmpty.value} />
        ) : (
          <NormalHeader classes={classes.value} is-empty={isEmpty.value} />
        )}
        {isEmpty.value && <div class='devui-table-empty'>No Data</div>}
      </div>
    );
  },
});

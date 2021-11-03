import { inject, defineComponent, Ref } from 'vue';
import { Table, TABLE_TOKEN } from '../table.type';
import { Column } from '../column/column.type';

export default defineComponent({
  name: 'DColGroup',
  setup() {
    const parent = inject(TABLE_TOKEN);
    const columns = parent.store.states._columns;
    return () => (
      <colgroup>
        {parent.props.tableLayout === 'fixed' ? (
          columns.value.map((column, index) => {
            return <col key={index} width={column.realWidth}></col>;
          })
        ) : null}
      </colgroup>
    );
  }
});
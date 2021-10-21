import { inject, defineComponent, Ref } from 'vue';
import { Table } from '../table.type';
import { Column } from '../column/column.type';

export default defineComponent({
  name: 'DColGroup',
  setup() {
    const parent: Table = inject('table');
    const columns = parent.store.states._columns;
    return () => (
      <colgroup>
        {columns.value.map((column, index) => {
          return <col key={index} width={column.realWidth}></col>;
        })}
      </colgroup>
    );
  }
});
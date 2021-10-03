import { inject, defineComponent } from 'vue';
import { Table } from '../table.type';
import { Column } from '../column/column.type';

export default defineComponent({
  name: 'DColGroup',
  setup() {
    const parent: Table = inject('table');
    const columns: Column = parent.store.states._columns;

    return { columns };
  },
  render() {
    const { columns } = this;
    return (
      <colgroup>
        {columns.map((column) => {
          return <col width={column.realWidth}></col>;
        })}
      </colgroup>
    );
  },
});
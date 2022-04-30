import { inject, defineComponent } from 'vue';
import { TABLE_TOKEN } from '../../table-types';

export default defineComponent({
  name: 'DColGroup',
  setup() {
    const parent = inject(TABLE_TOKEN);
    const columns = parent?.store.states._columns;
    return () =>
      parent?.props.fixHeader ? (
        <colgroup>
          {columns?.value.map((column, index) => {
            return <col key={index} width={column.realWidth}></col>;
          })}
        </colgroup>
      ) : null;
  },
});

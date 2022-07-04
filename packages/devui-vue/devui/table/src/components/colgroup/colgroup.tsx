import { inject, defineComponent, computed } from 'vue';
import { TABLE_TOKEN, ITableInstanceAndDefaultRow } from '../../table-types';
import { Column } from '../column/column-types';

export default defineComponent({
  name: 'DColGroup',
  setup() {
    const parent = inject(TABLE_TOKEN) as ITableInstanceAndDefaultRow;
    const columns = parent?.store.states.flatColumns;
    const isFixed = computed(() => parent?.props.tableLayout === 'fixed');
    return () => (
      <colgroup>
        {columns?.value.map((column: Column, index: number) => {
          return <col
            key={index}
            column-id={isFixed.value ? column.id : ''}
            width={
              column.type === 'expand'
                ? 60
                : isFixed.value
                  ? column.realWidth
                  : column.width || ''
            }
          ></col>;
        })}
      </colgroup>
    );
  },
});

import { inject, defineComponent } from 'vue';
import { TABLE_TOKEN } from '../table.type';

export default defineComponent({
  name: 'DColGroup',
  setup() {
    const parent = inject(TABLE_TOKEN);
    const columns = parent.store.states._columns;
    return () => (
      parent.props.tableLayout === 'fixed' ? (
        <colgroup>
          {/* 如果是 checkable，那么需要指定 col */}
          {parent.props.checkable ? <col width={36} /> : null}
          {columns.value.map((column, index) => {
            return <col key={index} width={column.realWidth}></col>;
          })}
        </colgroup>
      ) : null

    );
  }
});

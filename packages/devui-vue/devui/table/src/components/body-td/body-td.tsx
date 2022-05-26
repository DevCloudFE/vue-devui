import { defineComponent, toRef, inject } from 'vue';
import type { SetupContext } from 'vue';
import { bodyTdProps, BodyTdProps } from './body-td-types';
import { TABLE_TOKEN, Table } from '../../table-types';
import { Tooltip } from '../../../../tooltip';
import { useFixedColumn } from '../../composables/use-table';
import { useBodyTd } from './use-body-td';

export default defineComponent({
  name: 'DTableBodyTd',
  inheritAttrs: false,
  props: bodyTdProps,
  setup(props: BodyTdProps, ctx: SetupContext) {
    const column = toRef(props, 'column');
    const table = inject(TABLE_TOKEN) as Table;
    const { stickyClass, stickyStyle } = useFixedColumn(column);
    const { tdRef, isShowTooltip, tooltipContent } = useBodyTd(props);

    return () => {
      return <Tooltip content={tooltipContent.value} disabled={!isShowTooltip.value}>
        <td ref={tdRef} class={stickyClass.value} style={stickyStyle.value} {...ctx.attrs}>
          { props.column.renderCell?.(props.row, props.column, table.store, props.index) }
        </td>
      </Tooltip>;
    };
  },
});

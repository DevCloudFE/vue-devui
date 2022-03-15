import { computed, ComputedRef, CSSProperties, Ref, ToRefs } from 'vue';
import { Column } from './column/column.type';
import { TablePropsTypes } from './table.type';

interface TableConfig {
  classes: ComputedRef<Record<string, boolean>>;
  style: ComputedRef<CSSProperties>;
}

export function useTable(props: TablePropsTypes): TableConfig {
  const classes = computed(() => ({
    'devui-table': true,
    'devui-table-striped': props.striped,
    'header-bg': props.headerBg,
    'table-layout-auto': props.tableLayout === 'auto'
  }));
  const style: ComputedRef<CSSProperties> = computed(() => ({
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth,
    height: props.tableHeight,
    width: props.tableWidth
  }));
  return { classes, style };
}


export const useFixedColumn = (column: Ref<Column>): ToRefs<{ stickyCell: string; offsetStyle: string }> => {
  const stickyCell = computed(() => {
    const col = column.value;
    if (col.fixedLeft) {
      return `devui-sticky-cell left`;
    }

    if (col.fixedRight) {
      return `devui-sticky-cell right`;
    }
    return undefined;
  });

  const offsetStyle = computed(() => {
    const col = column.value;
    if (col.fixedLeft) {
      return `left:${col.fixedLeft}`;
    }

    if (col.fixedRight) {
      return `right:${col.fixedRight}`;
    }

    return undefined;
  });

  return {
    stickyCell,
    offsetStyle
  };
};

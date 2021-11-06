import { computed, ComputedRef, CSSProperties } from 'vue';
import { TablePropsTypes } from './table.type';

interface TableConfig {
  classes: ComputedRef<Record<string, boolean>>
  style: ComputedRef<CSSProperties>
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
  return {classes, style};
}
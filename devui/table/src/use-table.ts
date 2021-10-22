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
  }));
  const style: ComputedRef<CSSProperties> = computed(() => ({
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth    
  }));
  return {classes, style};
}
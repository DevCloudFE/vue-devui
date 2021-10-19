import { computed, ComputedRef } from 'vue';
import { TablePropsTypes } from './table.type';

export function useTable(props: TablePropsTypes): ComputedRef<Record<string, boolean>> {
  const classes = computed(() => ({
    'devui-table': true,
    'devui-table-striped': props.striped,
  }));

  return classes;
}
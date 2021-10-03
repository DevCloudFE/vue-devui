import { computed } from 'vue';
import { TablePropsTypes } from './table.type';

export function useTable(props: TablePropsTypes): any {
  const classes = computed(() => ({
    'devui-table': true,
    'devui-table-striped': props.striped,
  }));

  return { classes };
}
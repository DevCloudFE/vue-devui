import { inject, defineComponent, onBeforeMount, onMounted } from 'vue';
import {
  Column,
  TableColumnProps,
  TableColumnPropsTypes,
} from './column.type'
import { Table, TABLE_TOKEN } from '../table.type';
import { useRender } from './use-column';

export default defineComponent({
  name: 'DColumn',
  props: TableColumnProps,
  setup(props: TableColumnPropsTypes) {
    const column: Column = {
      field: props.field,
      header: props.header,
    };
    const parent = inject(TABLE_TOKEN);
    const { setColumnWidth, setColumnRender } = useRender(props);

    onBeforeMount(() => {
      setColumnWidth(column);
      setColumnRender(column);
    });

    onMounted(() => {
      parent.store.insertColumn(column);
    });
  },
  render() {
    return null;
  },
});
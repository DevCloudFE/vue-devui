import { inject, defineComponent, onBeforeMount, onBeforeUnmount, onMounted, reactive, watch } from 'vue';
import {
  Column,
  TableColumnProps,
  TableColumnPropsTypes,
} from './column.type'
import { TABLE_TOKEN } from '../table.type';
import { useRender } from './use-column';

export default defineComponent({
  name: 'DColumn',
  props: TableColumnProps,
  setup(props: TableColumnPropsTypes) {
    const column: Column = reactive({
      field: props.field,
      header: props.header,
      sortable: props.sortable
    });

    watch(
      [() => props.field, () => props.header, () => props.sortable],
      ([field, header, sortable]) => {
        column.field = field;
        column.header = header;
        column.sortable = sortable;
      }
    );

    const parent = inject(TABLE_TOKEN);
    const { setColumnWidth, setColumnRender } = useRender(props);

    onBeforeMount(() => {
      setColumnWidth(column);
      setColumnRender(column);
    });

    onMounted(() => {
      parent.store.insertColumn(column);
    });

    onBeforeUnmount(() => {
      parent.store.removeColumn(column);
    });
  },
  render() {
    return null;
  },
});
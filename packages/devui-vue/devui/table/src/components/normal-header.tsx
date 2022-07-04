import { computed, defineComponent, inject } from 'vue';
import ColGroup from './colgroup/colgroup';
import TableHeader from './header/header';
import TableBody from './body/body';
import { TABLE_TOKEN, ITableInstanceAndDefaultRow } from '../table-types';

export default defineComponent({
  props: {
    classes: {
      type: Object,
      default: () => ({}),
    },
    isEmpty: {
      type: Boolean,
    },
  },
  setup(props: { classes: Record<string, unknown>; isEmpty: boolean }) {
    const table = inject(TABLE_TOKEN, undefined) as ITableInstanceAndDefaultRow;
    const showHeader = computed(() => Boolean(table?.props.showHeader));
    return () => (
      <table class={props.classes} cellpadding="0" cellspacing="0">
        <ColGroup />
        {showHeader.value && <TableHeader style="position:relative" />}
        {!props.isEmpty && <TableBody />}
      </table>
    );
  },
});

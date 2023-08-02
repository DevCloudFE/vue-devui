import { computed, defineComponent, inject } from 'vue';
import ColGroup from './colgroup/colgroup';
import TableHeader from './header/header';
import TableBody from './body/body';
import { useNamespace } from '../../../shared/hooks/use-namespace';
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
    const ns = useNamespace('table');
    const table = inject(TABLE_TOKEN, undefined) as ITableInstanceAndDefaultRow;
    const showHeader = computed(() => Boolean(table?.props.showHeader));

    const { virtual } = table.props;
    const { virtualHeight } = table.store.states;

    return () => (
      <table class={props.classes} cellpadding="0" cellspacing="0">
        <ColGroup />
        {showHeader.value && <TableHeader style="position:relative" />}
        {!props.isEmpty && (
          <>
            {virtual && <div class={ns.e('virtual__scroll')} style={{ height: `${virtualHeight.value}px` }}></div>}
            <TableBody style="flex: 1" />
          </>
        )}
      </table>
    );
  },
});

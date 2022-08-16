import { computed, defineComponent, inject, withModifiers } from 'vue';
import ColGroup from './colgroup/colgroup';
import TableHeader from './header/header';
import TableBody from './body/body';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { useHorizontalScroll } from '../composables/use-horizontal-scroll';
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
    const { onTableScroll } = useHorizontalScroll(table);

    return () => (
      <div class={ns.e('fix-header')} onScroll={withModifiers(onTableScroll, ['stop'])}>
        {showHeader.value && (
          <div class={ns.e('header-wrapper')}>
            <table class={props.classes} cellpadding="0" cellspacing="0">
              <ColGroup />
              <TableHeader />
            </table>
          </div>
        )}
        <div class={ns.e('scroll-view')}>
          <table class={props.classes} cellpadding="0" cellspacing="0">
            <ColGroup />
            {!props.isEmpty && <TableBody style="flex: 1" />}
          </table>
        </div>
      </div>
    );
  },
});

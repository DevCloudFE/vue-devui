import { defineComponent } from 'vue';
import ColGroup from './colgroup/colgroup';
import TableHeader from './header/header';
import TableBody from './body/body';

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
    return () => {
      return (
        <div class='devui-table-view'>
          <div style='overflow:hidden scroll;'>
            <table class={props.classes} cellpadding='0' cellspacing='0'>
              <ColGroup />
              <TableHeader />
            </table>
          </div>
          <div class='scroll-view'>
            <table class={props.classes} cellpadding='0' cellspacing='0'>
              <ColGroup />
              {!props.isEmpty && <TableBody style='flex: 1' />}
            </table>
          </div>
        </div>
      );
    };
  },
});

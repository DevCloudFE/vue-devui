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
        <table class={props.classes} cellpadding='0' cellspacing='0'>
          <ColGroup />
          <TableHeader style='position:relative' />
          {!props.isEmpty && <TableBody />}
        </table>
      );
    };
  },
});

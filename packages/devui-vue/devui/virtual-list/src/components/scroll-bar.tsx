import { defineComponent } from 'vue';
import { virtualListScrollBarProps } from '../virtual-list-types';

export default defineComponent({
  name: 'DVirtualListScrollBar',
  props: virtualListScrollBarProps,
  setup() {
    return () => {
      return (
        <div>DVirtualListScrollBar</div>
      );
    };
  }
});

import type { SetupContext } from 'vue';
import { defineComponent } from 'vue';
import { virtualListProps, VirtualListProps } from './virtual-list-types';

export default defineComponent({
  name: 'DVirtualList',
  props: virtualListProps,
  emits: [],
  setup(props: VirtualListProps, ctx: SetupContext) {
    return () => {
      return (
        <div class="virtual-list">virtual-list</div>
      );
    };
  }
});

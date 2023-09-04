import { defineComponent } from 'vue';
import { useNamespace } from '@devui/shared/utils';
import './list-item.scss';

export default defineComponent({
  name: 'DListItem',
  setup(props, { slots }) {
    const ns = useNamespace('list-item');
    return () => <div class={ns.b()}>{slots.default?.()}</div>;
  },
});

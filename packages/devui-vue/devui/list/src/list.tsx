import { defineComponent } from 'vue';
import { useNamespace } from '@devui/shared/utils';
import './list.scss';

export default defineComponent({
  name: 'DList',
  setup(props, { slots }) {
    const ns = useNamespace('list');
    return () => <div class={ns.b()}>{slots.default?.()}</div>;
  },
});

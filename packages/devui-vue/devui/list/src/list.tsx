import { defineComponent } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './list.scss';

export default defineComponent({
  name: 'DList',
  setup(props, { slots }) {
    const ns = useNamespace('list');
    return () => <div class={ns.b()}>{slots.default?.()}</div>;
  },
});

import { defineComponent } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DAside',
  setup(props, { slots }) {
    const ns = useNamespace('layout');
    return () => <div class={ns.em('aside', 'inner')}>{slots.default?.()}</div>;
  },
});

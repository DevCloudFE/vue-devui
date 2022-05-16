import { defineComponent } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DModalFooter',
  setup(props, { slots }) {
    const ns = useNamespace('modal');

    return () => <div class={ns.e('footer')}>{slots.default?.()}</div>;
  },
});

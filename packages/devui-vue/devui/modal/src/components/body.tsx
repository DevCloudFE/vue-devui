import { defineComponent } from 'vue';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export default defineComponent({
  name: 'DModalBody',
  setup(props, { slots }) {
    const ns = useNamespace('modal');

    return () => <div class={ns.e('body')}>{slots.default?.()}</div>;
  },
});

import { defineComponent } from 'vue';
import { useNamespace } from '@devui/shared';

export default defineComponent({
  name: 'DModalBody',
  setup(props, { slots }) {
    const ns = useNamespace('modal');

    return () => <div class={ns.e('body')}>{slots.default?.()}</div>;
  },
});

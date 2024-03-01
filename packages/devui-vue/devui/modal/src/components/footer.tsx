import { defineComponent } from 'vue';
import { useNamespace } from '@devui/shared';

export default defineComponent({
  name: 'DModalFooter',
  setup(props, { slots }) {
    const ns = useNamespace('modal');

    return () => <div class={ns.e('footer')}>{slots.default?.()}</div>;
  },
});

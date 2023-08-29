import { defineComponent } from 'vue';
import { useNamespace } from '@devui/shared';

export default defineComponent({
  name: 'DModalHeader',
  setup(props, { slots }) {
    const ns = useNamespace('modal');

    return () => <div class={ns.e('header')}>{slots.default?.()}</div>;
  },
});

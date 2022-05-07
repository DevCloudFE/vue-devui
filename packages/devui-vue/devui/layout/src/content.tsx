import { defineComponent } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './content.scss';

export default defineComponent({
  name: 'DContent',
  setup(props, { slots }) {
    const ns = useNamespace('layout');
    return () => <div class={ns.e('content')}>{slots.default?.()}</div>;
  },
});

import { defineComponent } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './header.scss';

export default defineComponent({
  name: 'DHeader',
  setup(props, { slots }) {
    const ns = useNamespace('layout');
    return () => <div class={ns.e('header')}>{slots.default?.()}</div>;
  },
});

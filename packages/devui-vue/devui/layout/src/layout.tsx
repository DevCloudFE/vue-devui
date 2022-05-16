import { defineComponent, VNode } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './layout.scss';

interface SlotComponent extends VNode {
  name?: string;
}

export default defineComponent({
  name: 'DLayout',
  emits: [],
  setup(props, { slots }) {
    const ns = useNamespace('layout');
    return () => {
      const slotDefault: SlotComponent[] = slots.default?.();
      const isAside = slotDefault.some((item) => (item.type as any).name === 'DAside');
      const classNames = `${isAside ? ns.e('aside') : ''} ${ns.b()}`;
      return <div class={classNames}>{slotDefault}</div>;
    };
  },
});

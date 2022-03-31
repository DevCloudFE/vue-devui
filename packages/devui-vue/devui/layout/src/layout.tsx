import { defineComponent, VNode } from 'vue';
import './layout.scss';

interface SlotComponent extends VNode {
  name?: string;
}

export default defineComponent({
  name: 'DLayout',
  emits: [],
  setup(props, { slots }) {
    return () => {
      const slotDefault: SlotComponent[]  = slots.default?.();
      const isAside = slotDefault.some(item => item.name === 'DAside');
      const classNames = `${isAside ? 'devui-layout-aside ': ''}devui-layout`;
      return <div class={classNames}>{ slotDefault }</div>;
    };
  }
});

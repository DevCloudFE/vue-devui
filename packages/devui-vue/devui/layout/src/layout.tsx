import './layout.scss';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DLayout',
  emits: [],
  setup(props, { slots }) {
    return () => {
      const slotDefault = slots.default?.();
      const isAside = slotDefault.some(item => (item.type as any).name === 'DAside');
      const classNames = `${isAside ? 'devui-layout-aside ': ''}devui-layout`;
      return <div class={classNames}>{ slotDefault }</div>;
    };
  }
});

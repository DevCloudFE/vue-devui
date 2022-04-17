import './header.scss';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DHeader',
  setup (props, { slots }) {
    return () => <div class="devui-header">{ slots.default?.() }</div>;
  }
});

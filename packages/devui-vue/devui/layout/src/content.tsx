import './content.scss';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DContent',
  setup (props, { slots }) {
    return () => <div class="devui-content">{slots.default?.()}</div>;
  }
});

import { defineComponent } from 'vue';
import './list.scss';

export default defineComponent({
  name: 'DList',
  setup(props, { slots }) {
    return () => <div class='devui-list'>{slots.default?.()}</div>;
  },
});

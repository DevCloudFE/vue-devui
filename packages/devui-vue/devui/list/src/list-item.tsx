import { defineComponent } from 'vue';
import './list-item.scss';

export default defineComponent({
  name: 'DListItem',
  setup(props, { slots }) {
    return () => <div class='devui-list-item'>{slots.default?.()}</div>;
  },
});

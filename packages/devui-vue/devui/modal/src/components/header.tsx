import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DModalHeader',
  setup(props, { slots }) {
    return () => <div class='devui-modal-header'>{slots.default?.()}</div>;
  },
});

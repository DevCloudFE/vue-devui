import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DModalBody',
  setup(props, { slots }) {
    return () => <div class='devui-modal-body'>{slots.default?.()}</div>;
  },
});

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DModalFooter',
  setup(props, { slots }) {
    return () => <div class='devui-modal-footer'>{slots.default?.()}</div>;
  },
});

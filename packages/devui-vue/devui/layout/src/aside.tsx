import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DAside',
  setup (props, { slots }) {
    return () => <div>{ slots.default?.() }</div>;
  }
});

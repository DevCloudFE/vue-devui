import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DEditableSelectOption',
  setup(props, ctx) {
    return () => {
      const defaultSlot = ctx.slots.default && ctx.slots.default();
      return <li class="devui-dropdown-item">{defaultSlot}</li>;
    };
  },
});

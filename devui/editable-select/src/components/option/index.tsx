import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DEditableSelectOption',
  setup(props, ctx) {
    const defaultSlot = ctx.slots.default && ctx.slots.default();
    return () => {
      return <li class="devui-dropdown-item">{defaultSlot}</li>;
    };
  },
});

import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'DEditableSelectDropdown',
  props: {
    maxHeight: {
      type: [Number, String],
      default: 300,
    },
  },
  setup(props, ctx) {
    return () => {
      const defaultSlot = ctx.slots.default && ctx.slots.default();
      return (
        <div class="devui-dropdown-menu">
          <ul
            class="devui-list-unstyled scroll-height"
            style={{
              maxHeight: props.maxHeight + 'px',
            }}
          >
            {defaultSlot}
          </ul>
        </div>
      );
    };
  },
});

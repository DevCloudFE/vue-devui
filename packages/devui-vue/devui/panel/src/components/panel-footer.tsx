import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DPanelFooter',
  setup(props, ctx) {
    return () => {
      const footerContent = ctx.slots.default ? <div class='devui-panel-footer'>{ctx.slots.default?.()}</div> : null;
      return footerContent;
    };
  },
});
